import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestIntegrationModule } from '../../../test/test-integration.module';

describe('User (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestIntegrationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) should return a list of users', async () => {
    const res = await request(app.getHttpServer()).get('/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/users (POST) should create a new user', async () => {
    const userData = { name: 'John Doe' };

    const res = await request(app.getHttpServer())
      .post('/users')
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(userData);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
  });
});
