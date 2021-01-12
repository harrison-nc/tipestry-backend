const request = require('supertest');

describe('/api/users', () => {
    let server;

    const createUser = (value) => {
        return request(server)
            .post('/api/users')
            .send(value);
    };

    beforeEach(() => {
        server = require('../../src/index.js');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('POST /api/users', () => {
        it('should return 400 if name is not provided', async () => {
            const res = await createUser({});

            expect(res.status).toBe(400);
        });

        it('should return 400 is name length is less than 4', async () => {
            const res = await createUser({ name: '123' });

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is not provided', async () => {
            const res = await createUser({ name: 'user' });

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is not provided', async () => {
            const payload = { name: 'user', email: 'user@mail.com' };
            const res = await createUser(payload)

            expect(res.status).toBe(400);
        });
    });
});
