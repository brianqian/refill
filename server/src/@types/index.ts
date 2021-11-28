import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver, SqlEntityRepository } from '@mikro-orm/postgresql';
import { EnvironmentSchema } from '../config/env';

export interface Db extends MikroORM<PostgreSqlDriver> {}
export interface DbRepo<T> extends SqlEntityRepository<T> {}

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db;
    config: EnvironmentSchema;
  }
}
