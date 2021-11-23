import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver, SqlEntityRepository } from '@mikro-orm/postgresql';

export interface Db extends MikroORM<PostgreSqlDriver> {}
export interface DbRepo<T> extends SqlEntityRepository<T> {}
