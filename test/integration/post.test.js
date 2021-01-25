const request = require('supertest');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../../src/db/user');
const Post = require('../../src/db/post');

describe('/api/posts', () => {
    let server;
    let token;
    let user;
    let post;
    let dbPost;

    beforeEach(async () => {
        global.debug = false;

        server = require('../../src/index');

        user = new User({
            _id: new ObjectId().toHexString(),
            name: 'user',
            email: 'user@mail.com',
        });

        post = {
            title: 'post1',
            resourceUrl: 'resource.com/myresource',
            description: 'a description',
            upVotes: 0,
            downVotes: 0,
            tags: ['tag1'],
        }

        token = user.generateAuthToken();

        try {
            dbPost = await Post.create(post, user);
        } catch (e) {
            console.error(e);
        }
    });

    afterEach(async () => {
        await Post.deleteMany({});
        await server.close();
    });

    describe('GET /api/posts', () => {
        const getAllPost = (param = '') => {
            return request(server).get('/api/posts/' + param);
        };

        it('should return 200', async () => {
            const res = await getAllPost();

            expect(res.status).toBe(200);
        });

        it('should return an array of posts', async () => {
            const res = await getAllPost();

            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should return an array containing one posts', async () => {
            const res = await getAllPost();

            expect(res.body.length).toBe(1);
        });

        describe('GET /api/posts/:id', () => {
            it('should return 400 if id is invalid', async () => {
                const res = await getAllPost('1');

                expect(res.status).toBe(400);
            });

            it('should return 404 if a post with the given id does not exists', async () => {
                const res = await getAllPost(new ObjectId().toHexString());

                expect(res.status).toBe(404);
            });

            it('should return a post if request is valid', async () => {
                const res = await getAllPost(dbPost._id);

                expect(res.body).not.toBeNull();
                expect(res.body).toMatchObject({
                    _id: dbPost._id.toHexString(),
                    title: dbPost.title,
                });
                expect(res.body).toHaveProperty('createdAt');
            });
        });
    });

    describe('POST /api/posts', () => {
        const createPost = (data, header, value) => {
            return request(server)
                .post('/api/posts')
                .set(header, value)
                .send(data);
        };

        it('should return 400 if token is invalid', async () => {
            const res = await createPost(post, 'x-auth-token', '1234');

            expect(res.status).toBe(400);
        });

        it('should return 400 if title is not provided', async () => {
            delete post.title;

            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(400);
        });

        it('should return 400 if resourceUrl is not provided', async () => {
            delete post.resourceUrl;

            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(400);
        });

        it('should return 400 tag is not an array', async () => {
            post.tags = '1';

            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(400);
        });

        it('should return 200 if no token is provided and request is valid', async () => {
            post.title = 'Anno post';

            const res = await createPost(post, 'x-no-auth', '');

            expect(res.status).toBe(200);
        });

        it('should return 200 if token is valid', async () => {
            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(200);
        });

        it('should return the post if request is valid', async () => {
            const res = await createPost(post, 'x-auth-token', token);

            expect(res.body).toHaveProperty('title', post.title);
            expect(res.body).toHaveProperty('resourceUrl', post.resourceUrl);
            expect(res.body).toHaveProperty('description', post.description);
            expect(res.body).toHaveProperty('tags', post.tags);
        });

        it('should save the post if request is valid', async () => {
            const res = await createPost(post, 'x-auth-token', token);

            const postInDb = await Post.findOne({ title: post.title });

            expect(res.body).toHaveProperty('_id');
            expect(postInDb).not.toBeNull();
        });
    });

    describe('POST /api/posts/:id', () => {
        let endPoint;

        const updateVotes = (id, votes) => {
            return request(server)
                .post(`/api/posts/${id}/${endPoint}`)
                .send(votes);
        }

        describe('POST /api/posts/:id/upvotes', () => {
            beforeEach(() => {
                endPoint = 'upvotes';
            });

            it('should return 400 if post id is invalid', async () => {
                const postId = 1;

                const res = await updateVotes(postId, { upVotes: 1, downVotes: 1 });

                expect(res.status).toBe(400);
            });

            it('should return 404 if post with the given id is not found', async () => {
                const postId = new ObjectId().toHexString();

                const res = await updateVotes(postId, { upVotes: 1, downVotes: 1 });

                expect(res.status).toBe(404);
            });

            it('should return upvotes if request is valid', async () => {
                const postId = dbPost._id;
                let { upVotes } = dbPost;
                upVotes += 1;

                const res = await updateVotes(postId, { upVotes: 1 });

                expect(res.body).toMatchObject({ upVotes: 1 });
            });

            it('should save upvotes if request is valid', async () => {
                const postId = dbPost._id;
                let { upVotes } = dbPost;
                upVotes += 1;

                await updateVotes(postId, { upVotes });

                const post = await Post.findById(postId);

                expect(post).not.toBeNull();
                expect(post.upVotes).toEqual(upVotes);
            });
        });

        describe('POST /api/posts/:id/downvotes', () => {
            beforeEach(() => {
                endPoint = 'downvotes';
            });

            it('should return 400 if post id is invalid', async () => {
                const postId = 1;

                const res = await updateVotes(postId, { upVotes: 1, downVotes: 1 });

                expect(res.status).toBe(400);
            });

            it('should return 404 if post with the given id is not found', async () => {
                const postId = new ObjectId().toHexString();

                const res = await updateVotes(postId, { upVotes: 1, downVotes: 1 });

                expect(res.status).toBe(404);
            });

            it('should return downVotes if request is valid', async () => {
                const postId = dbPost._id;
                let { downVotes } = dbPost;
                downVotes += 1;

                const res = await updateVotes(postId, { downVotes: 1 });

                expect(res.body).toMatchObject({ downVotes: 1 });
            });

            it('should save downVotes if request is valid', async () => {
                const postId = dbPost._id;
                let { downVotes } = dbPost;
                downVotes += 1;

                await updateVotes(postId, { downVotes });

                const post = await Post.findById(postId);

                expect(post).not.toBeNull();
                expect(post.downVotes).toEqual(downVotes);
            });
        });
    });

    describe('GET /api/posts/:id/comments', () => {

        const getPostComments = (id) => {
            return request(server)
                .get(`/api/posts/${id}/comments`);
        };

        it('should return 400 if post id is invalid', async () => {
            const res = await getPostComments('1');

            expect(res.status).toBe(400);
        });

        it('should return 200', async () => {
            const res = await getPostComments(dbPost._id);

            expect(res.status).toBe(200);
        });

        it('should return an array of comments', async () => {
            const res = await getPostComments(dbPost._id);

            expect(res.body).toHaveProperty('comments');
            expect(res.body.comments).toBeDefined();
            expect(Array.isArray(res.body.comments)).toBe(true);
        });
    });
});
