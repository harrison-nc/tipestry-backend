const request = require('supertest');
const ObjectId = require('mongoose').Types.ObjectId;
const { User } = require('../../src/model/user');

describe('/api/logins', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index');
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

            await new User({
                _id: new ObjectId().toHexString(),
                name: 'user',
                email: user.email,
                password: user.password,
            }).save();
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

        it('should set jwt response header token if request is valid', async () => {
            const res = await login(user);

            expect(res.headers).toHaveProperty('x-auth-token');
        });
    });
});
