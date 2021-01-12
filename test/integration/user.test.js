const mongoose = require('mongoose');
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

        it('should return 400 if password is not provided', async () => {
            delete user.password;

            const res = await createUser(user)

            expect(res.status).toBe(400);
        });

        it('should return 200 if request is valid', async () => {
            const res = await createUser(user);

            expect(res.status).toBe(200);
        });

        it('should return the user if request if valid', async () => {
            const res = await createUser(user);

            expect(res.body).toMatchObject(user);
        });
    });
});
