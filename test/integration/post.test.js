const request = require('supertest');

describe('It works!', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('POST /api/posts', () => {

        const createPost = (data, header = 'x-auth-token', value = '') => {
            return request(server)
                .post('/api/posts')
                .set(header, value)
                .send(data);
        };

        it('should return 401 if token is not provided', async () => {
            const res = await createPost({}, 'x-invalid-header');

            expect(res.status).toBe(401);
        });

        it('should return 400 if token is invalid', async () => {
            const res = await createPost({}, 'x-auth-token', '1234');

            expect(res.status).toBe(400);
        });
    });
});
