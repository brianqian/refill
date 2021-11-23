import Fastify from 'fastify';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import fastifyEnv from 'fastify-env';
import middie from 'middie';
import routes from './routes';
import getOrmConfig from './config/db';
import { RouteOptionsWithOrm } from './types/route';
import { Db } from './types/common';

const PORT = process.env.PORT || 8080;
// const DEV_MODE = process.env.NODE_ENV !== 'production';

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
