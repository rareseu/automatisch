import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../app.js';
import createAuthTokenByUserId from '../../../../helpers/create-auth-token-by-user-id';
import { createUser } from '../../../../../test/factories/user';
import getAppMock from '../../../../../test/mocks/rest/api/v1/apps/get-app.js';

describe('GET /api/v1/apps/:appKey', () => {
  let currentUser, token;

  beforeEach(async () => {
    currentUser = await createUser();
    token = createAuthTokenByUserId(currentUser.id);
  });

  it('should return the app info', async () => {
    const response = await request(app)
      .get('/api/v1/apps/github')
      .set('Authorization', token)
      .expect(200);

    const expectedPayload = getAppMock('github');
    expect(response.body).toEqual(expectedPayload);
  });

  it('should return not found response for invalid app key', async () => {
    await request(app)
      .get('/api/v1/apps/invalid-app-key')
      .set('Authorization', token)
      .expect(404);
  });
});
