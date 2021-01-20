const User = require('../../src/db/user');
const ObjectId = require('mongoose').Types.ObjectId;
const request = require('supertest');

describe('/api/users', () => {
    let server;
    let user;

    const createUser = (value) => {
        return request(server)
            .post('/api/users')
            .send(value);
    };

    beforeEach(() => {
        server = require('../../src/index.js');

        user = {
            name: 'user',
            email: 'user@mail.com',
            password: 'secret'
        };
    });

    afterEach(async () => {
        await User.deleteMany({});
        await server.close();
    });

    describe('POST /api/users', () => {
        it('should return 400 if name is not provided', async () => {
            delete user.name;

            const res = await createUser(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 is name length is less than 4', async () => {
            user.name = '123';

            const res = await createUser(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is not provided', async () => {
            delete user.email;

            const res = await createUser(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is not valid', async () => {
            user.email = '1234';

            const res = await createUser(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if email already exist', async () => {
            await User.create(user);

            const res = await createUser(user);

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is not provided', async () => {
            delete user.password;

            const res = await createUser(user)

            expect(res.status).toBe(400);
        });

        it('should return 400 if password length is less than 5', async () => {
            user.password = '1234';

            const res = await createUser(user);

            expect(res.status).toBe(400);
        });

        it('should return 200 if request is valid', async () => {
            const res = await createUser(user);

            expect(res.status).toBe(200);
        });

        it('should return the user if request is valid', async () => {
            const res = await createUser(user);

            expect(res.body).toHaveProperty('register.name', user.name);
            expect(res.body).toHaveProperty('register.email', user.email);
        });

        it('should not return the user password if request is valid', async () => {
            const res = await createUser(user);

            expect(res.body).not.toHaveProperty('password');
        });

        it('should save the user if the request is valid', async () => {
            const res = await createUser(user);

            const userInDb = await User.findOne({ name: user.name });

            expect(userInDb).not.toBeNull();
            expect(userInDb.email).toMatch(user.name);
        });
    });
});
