import 'fastify';
import { Db } from './common';
import { EnvironmentVarSchema } from '../config/env';

declare module 'fastify' {
  interface FastifyInstance {
    db: Db;
    config: EnvironmentVarSchema;
    authenticate: () => void;
  }
}
