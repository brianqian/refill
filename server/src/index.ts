import Fastify from 'fastify';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import fastifyEnv from 'fastify-env';
import middie from 'middie';
import routes from './routes';
import getOrmConfig from './config/db';
import { Db } from './@types/common';
import { fastifyEnvOptions } from './config/env';

const PORT = process.env.PORT || 8080;

const app = Fastify({
  logger: {
    prettyPrint: true,
  },
});

const startServer = async () => {
  const { orm, storage } = await getOrmConfig();
  await app.register(middie);
  await app.register(cors);
  await app.register(sensible);
  await app.register(fastifyEnv, fastifyEnvOptions);

  app.register((_req, _res, next) => {
    storage.run(orm.em.fork(true, true), next);
  });

  await app.register<Db>(routes, orm);

  app.get('*', async (_req, res) => {
    return res.code(404).send({ message: 'No route found' });
  });

  await app.ready();

  app.listen(PORT, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log();
    console.log(`Server listening at ${address}}`);
  });
};

startServer();
