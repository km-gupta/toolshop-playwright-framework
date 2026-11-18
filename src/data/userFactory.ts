import { randomUUID } from "node:crypto";

export function createUser() {
  const unique = randomUUID().slice(0, 8);
  
  return {
    first_name: 'Test',
    last_name: 'User',
    address: {
      street: 'Street 1',
      house_number: '12',
      city: 'City',
      state: 'State',
      country: 'Country',
      postal_code: '1234AA',
    },
    phone: '0987654321',
    dob: '1990-01-01',
    password: 'deUserOrg@84432',
    email: `test.${unique}@example.com`,
  };
}

export type NewUser = ReturnType<typeof createUser>;