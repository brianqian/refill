import { EntityManager, MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AsyncLocalStorage } from 'async_hooks';

export interface ConnectionOptions {
  dbName?: string;
  name?: string; // for logging only (when replicas are used)
  clientUrl?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  charset?: string;
}

async function getOrmConfig() {
  const storage = new AsyncLocalStorage<EntityManager>();
  const orm = await MikroORM.init({
    context: () => storage.getStore(),
    entities: ['./dist/src/entities'],
    entitiesTs: ['./src/entities'],
    metadataProvider: TsMorphMetadataProvider,
    dbName: 'my-db-name',
    type: 'postgresql',
    driver: PostgreSqlDriver,
  });
  return { orm, storage };
}

export default getOrmConfig;
