import redis from 'redis';
import config from '../config';

const client = redis.createClient(config.redis);

export default client;
