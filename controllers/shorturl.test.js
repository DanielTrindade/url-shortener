const request = require('supertest');
const app = require('../app');

describe('Short URL API', () => {

    describe('POST /shorten', () => {

        it('should create a new short URL', async () => {
            const longUrl = 'https://www.google.com/';
            const response = await request(app).post('/shorten').send({ longUrl });
            expect(response.status).toBe(200);
            expect(response.body.shortUrl).toBeDefined();
        });

        //mais outro teste para o create
        it('should create a new short URL', async () => {
            const longUrl = 'https://blog.logrocket.com/how-build-url-shortener-node-js/';
            const response = await request(app).post('/shorten').send({ longUrl });
            expect(response.status).toBe(200);
            expect(response.body.shortUrl).toBeDefined();
        });

        it('should return an existing short URL if the same long URL is provided', async () => {
            const longUrl = 'https://www.google.com/';
            const response = await request(app).post('/shorten').send({ longUrl });
            const existingShortUrl = 'https://myurlshortenerapp.kTkOnkN1MGB';
            expect(response.status).toBe(200);
            expect(response.body.shortUrl).toBe(existingShortUrl);
        });

        it('should return an existing short URL if the same long URL is provided', async () => {
            const longUrl = 'https://blog.logrocket.com/how-build-url-shortener-node-js/';
            const response = await request(app).post('/shorten').send({ longUrl });
            const existingShortUrl = 'https://myurlshortenerapp.Xk_gy4pq2Qi';
            expect(response.status).toBe(200);
            expect(response.body.shortUrl).toBe(existingShortUrl);
        });
    });

    describe('GET /:shortUrlCode', () => {
        it('should redirect to the original long URL', async () => {
            const shortUrlCode = 'xDH7Ug3A9Te';
            const response = await request(app).get(`/${shortUrlCode}`);
            expect(response.status).toBe(302);
        });

        it('should redirect to the original long URL', async () => {
            const shortUrlCode = 'Xk_gy4pq2Qi';
            const response = await request(app).get(`/${shortUrlCode}`);
            expect(response.status).toBe(302);
        });

        it('should return a 404 status if the short URL code does not exist', async () => {
            const shortUrlCode = 'nonexistent';
            const response = await request(app).get(`/${shortUrlCode}`);
            expect(response.status).toBe(404);
        });
    });
});
