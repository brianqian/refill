import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import fastifyJWT from 'fastify-jwt';
import fastifyCookie from 'fastify-cookie';
import fastifyEnv from 'fastify-env';
import middie from 'middie';
import routes from './routes';
import getOrmConfig from './config/db';
import { Db } from './@types/common';
import { fastifyEnvOptions } from './config/env';

const app = Fastify({
  logger: {
    prettyPrint: true,
  },
});

export const startServer = async () => {
  const { orm, storage } = await getOrmConfig();
  await app.register(fastifyEnv, fastifyEnvOptions);
  await app.register(middie);
  await app.register(cors);
  await app.register(sensible);
  await app.register(fastifyCookie, {
    secret: app.config.COOKIE_SECRET,
  });

  app.register((_req, _res, next) => {
    storage.run(orm.em.fork(true, true), next);
  });

  app.register(fastifyJWT, {
    secret: app.config.JWT_SECRET,
    cookie: {
      cookieName: 'sid',
      signed: false,
    },
  });

  app.decorate('authenticate', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  });

  await app.register<Db>(routes, orm);

  app.get('*', async (_req, res) => {
    return res.code(404).send({ message: 'No route found' });
  });

  await app.ready();

  app.listen(8080, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}}`);
  });
};
