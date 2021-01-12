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

        const login = (user) => {
            return request(server)
                .post('/api/logins')
                .send();
        };

        it('should return 400 if email is not provided', async () => {
            const res = await login({});

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is not valid', async () => {
            const res = await login({ email: '1234' });

            expect(res.status).toBe(400);
        });
    });
});
