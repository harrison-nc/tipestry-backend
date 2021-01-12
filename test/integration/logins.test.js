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
        let user;

        beforeEach(() => {
            user = {
                email: 'user@gmail.com',
                password: 'secret',
            };
        });

        const login = (user) => {
            return request(server)
                .post('/api/logins')
                .send(user);
        };

        it('should return 400 if email is not provided', async () => {
            delete user.email;

            const res = await login(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is not valid', async () => {
            user.email = '1234';

            const res = await login(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is not provided', async () => {
            delete user.password;

            const res = await login(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if password length is less than 5', async () => {
            user.password = '1234';

            const res = await login(user);

            expect(res.status).toBe(400);
        });
    });
});
