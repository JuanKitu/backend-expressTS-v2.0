import { Entity, Schema } from 'redis-om';
import { client } from '../database/redis.db';

class Person extends Entity {}

const personSchema = new Schema(Person, {
  account: { type: 'number' },
  roleList: { type: 'string[]' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  personalStatement: { type: 'text' },
});
export const personRepository = client.fetchRepository(personSchema);
personRepository.createIndex().then();
