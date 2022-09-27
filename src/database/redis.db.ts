import { createClient } from 'redis';

const client = createClient();
// eslint-disable-next-line no-console
client.on('error', (err) => console.log('Redis client Error', err));
client.connect().then();

export default client;
