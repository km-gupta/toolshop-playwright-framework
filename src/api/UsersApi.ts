import { APIRequestContext, expect } from '@playwright/test';
import { API_URL } from '../config/env';
import { NewUser } from '../data/userFactory';

export class UsersApi {
  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string) {
    return this.request.post(`${API_URL}/users/login`, { data: { email, password } });
  }

  async register(user: NewUser) {
    return this.request.post(`${API_URL}/users/register`, { data: user });
  }

  async deleteUser(id: string, adminToken: string): Promise<void> {
    const response = await this.request.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(response.status()).toBe(204);
  }
}
