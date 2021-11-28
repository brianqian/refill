import 'fastify';
import { Db } from './common';
import { EnvironmentSchema } from '../config/env';

declare module 'fastify' {
  interface FastifyInstance {
    db: Db;
    config: EnvironmentSchema;
  }
}
