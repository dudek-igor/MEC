import request from 'supertest';
import AppServer from '@/app';
import IndexRoute from '@routes/index.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const server = new AppServer([indexRoute]);

      return request(server.getServer).get(`${indexRoute.path}`).expect(200);
    });
  });
});
