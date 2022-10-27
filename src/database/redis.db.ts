import { Client } from 'redis-om';

export const client = new Client();

export const createClient = async () => {
  if (!client.isOpen()) {
    await client.open('redis://localhost:6379');
  }
};
