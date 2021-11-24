import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver, SqlEntityRepository } from '@mikro-orm/postgresql';
import { EnvironmentSchema } from '../config/env';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db;
    config: EnvironmentSchema;
  }
}

export interface Db extends MikroORM<PostgreSqlDriver> {}
export interface DbRepo<T> extends SqlEntityRepository<T> {}

export interface GetUserParams {
  Params: {
    id: string;
  };
}
export interface CreateUser {
  Params: {
    id: string;
  };
}
