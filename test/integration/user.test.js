const request = require('supertest');

describe('/api/users', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index.js');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('POST /api/users', () => {
        it('should return 400 if name is not provided', async () => {
            const res = await request(server)
                .post('/api/users')
                .send({});

            expect(res.status).toBe(400);
        });

        it('should return 400 is name length is less than 4', async () => {
            const res = await request(server)
                .post('/api/users')
                .send({ name: '123' });

            expect(res.status).toBe(400);
        });
    });
});
