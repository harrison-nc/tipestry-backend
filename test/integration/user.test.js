const request = require('supertest');

describe('It works!', () => {
    let server;

    beforeEach(() => {
        server = require('../../src/index.js');
    });

    afterEach(async () => {
        await server.close();
    });

    it('should return Hello, World!', async () => {
        const res = await request(server).get('/');

        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('Hello, World!');
    });
});
