const request = require('supertest');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../../src/db/user');

describe('/api/logins', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index.server');
    });

    afterEach(async () => {
        await User.deleteMany({});
        await server.close();
    });

    describe('POST /api/logins', () => {
        let user;

        beforeEach(async () => {
            user = {
                email: 'user@gmail.com',
                password: 'secret',
            };

            await User.create({ name: 'user', ...user });
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

        it('should return 400 if email is invalid', async () => {
            user.email = 'notfound@mail.com';

            const res = await login(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is invalid', async () => {
            user.password = 'notfound';

            const res = await login(user);

            expect(res.status).toBe(400);
        });

        it('should return 200 if request is valid', async () => {
            const res = await login(user);

            expect(res.status).toBe(200);
        });

        it('should return message if request is valid', async () => {
            const res = await login(user);

            expect(res.body).toHaveProperty('login.message');
        });

        it('should return access-token if request is valid', async () => {
            const res = await login(user);

            expect(res.body).toHaveProperty('login.access-token');
        });
    });
});
