export const API_URL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

export const WRONG_USER = {
  email: 'not-a-user@example.com',
  password: 'wrong_password',
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const ADMIN_USER = {
  email: requireEnv('ADMIN_EMAIL'),
  password: requireEnv('ADMIN_PASSWORD'),
};
