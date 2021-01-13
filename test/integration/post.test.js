const request = require('supertest');
const User = require('../../src/db/user');

describe('/api/posts', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('POST /api/posts', () => {
        let post;
        let token;

        beforeEach(() => {
            post = {
                title: 'post1',
                resourceUrl: 'resource.com/myresource',
                description: 'a description',
                upVotes: 0,
                downVotes: 0,
                tags: ['tag1'],
                comments: [],
            }
            token = new User().generateAuthToken();
        });

        const createPost = (data, header = 'x-auth-token', value = token) => {
            return request(server)
                .post('/api/posts')
                .set(header, value)
                .send(data);
        };

        it('should return 401 if token is not provided', async () => {
            const res = await createPost(post, 'x-invalid-header');

            expect(res.status).toBe(401);
        });

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

        it('should return 400 if hashtag is not provided', async () => {
            delete post.tags;

            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(400);
        });

        it('should return 400 tag is not an array', async () => {
            post.tags = '1';

            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(400);
        });

        it('should return 400 if at least on hashtag is not provided', async () => {
            post.tags = [];

            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(400);
        });

        it('should return 200 if token is valid', async () => {
            const res = await createPost(post, 'x-auth-token', token);

            expect(res.status).toBe(200);
        });
    });
});
