import { APIRequestContext } from '@playwright/test';
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
}
