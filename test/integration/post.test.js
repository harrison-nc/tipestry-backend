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
        it('should return 401 if token is not provided', async () => {
            const res = await request(server)
                .post('/api/posts')
                .send({});

            expect(res.status).toBe(401);
        });
    });
});
