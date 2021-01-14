const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../../src/db/post');
const User = require('../../src/db/user');
const request = require('supertest');

describe('/api/comments', () => {
	let server;
	let postId;

	const addComment = (comment) => {
		return request(server)
			.post('/api/comments')
			.send(comment);
	};

	beforeEach(async () => {
		server = require('../../src/index');
		postId = new ObjectId().toHexString();

		const user = new User({
            _id: new ObjectId().toHexString(),
            name: 'user',
            email: 'user@mail.com',
        });

		let post = {
            title: 'post1',
            resourceUrl: 'resource.com/myresource',
            description: 'a description',
            upVotes: 0,
            downVotes: 0,
            tags: ['tag1'],
        };

		post = await Post.create(post, user);
		postId = post._id.toHexString();
	});

	afterEach(async () => {
		await Post.deleteMany({});
		await server.close();
	})

	describe('POST /api/comments', () => {
		it('should return 400 if post id is not provided', async () => {
			const res = await addComment({text: 'comment'});

			expect(res.status).toBe(400);
		});

		it('should return 400 if post id is invalid', async () => {
			const res = await addComment({postId: 1, text: 'comment'});

			expect(res.status).toBe(400);
		});

		it('should return 400 if text is not provided', async () => {
			const res = await addComment({ postId });

			expect(res.status).toBe(400);
		});

		it('should return 404 if a post with the given id is not found', async () => {
			const postId = new ObjectId().toHexString();

			const res = await addComment({ postId, text: 'comment' });

			expect(res.status).toBe(404);
		});

		it('should return 200 if request is valid', async () => {
			const res = await addComment({ postId, text: 'comment' });

			expect(res.status).toBe(200);
		});

		it('should return the comment if the request is valid', async () => {
			const res = await addComment({ postId, text: 'comment' });

			expect(res.body).toMatchObject({ text: 'comment' });
			expect(res.body).toHaveProperty('_id');
		});

		it('should save the comment if the request is valid', async () => {
			const comment = 'commen 1';

			await addComment({ postId, text: comment });

			const post = await Post.findById(postId).select('comments -_id');

			expect(post).not.toBeNull();
			expect(post).toHaveProperty('comments');
			expect(post.comments.length).toBe(1);
			expect(post.comments[0]).toEqual(expect.objectContaining({
				text: comment
			}));
		});

		it('should save annon user if no user is provided', async () => {
			const res = await addComment({ postId, text: 'comment' });

			const post = await Post.findById(postId).select('comments');

			expect(post).not.toBeNull();
			expect(post.comments).not.toBeNull();
			expect(post.comments.length).toBe(1);
			expect(post.comments[0].user).toBeDefined();
			expect(post.comments[0].user.name).toMatch(/annon/);
			expect(post.comments[0].user.email).toMatch(/annon/);
		});

		it('should save provided user', async () => {
			const commentAuthor = { name: 'author', email: 'author@mail.com' };

			const res = await addComment({
				postId,
				text: 'comment',
				user: commentAuthor
			});

			const post = await Post.findById(postId).select('comments');

			expect(post).not.toBeNull();
			expect(post.comments).not.toBeNull();
			expect(post.comments.length).toBe(1);
			expect(post.comments[0].user).toBeDefined();
			expect(post.comments[0].user.name).toMatch(/author/);
			expect(post.comments[0].user.email).toMatch(/author/);
		});
	});
});