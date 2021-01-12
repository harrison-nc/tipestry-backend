const request = require('supertest');

describe('/api/logins', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('POST /api/logins', () => {
        it('should return 400 if email is not provided', async () => {
            const res = await request(server)
                .post('/api/logins')
                .send({});

            expect(res.status).toBe(400);
        });
    });
});
