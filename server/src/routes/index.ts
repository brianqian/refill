import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import BaseController from '../controllers/base.controller';
import { Db } from '../@types/common';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes: FastifyPluginCallback<Db> = async (fastify, db, done) => {
  const Controller = BaseController.build(db);

  fastify.register(userRoutes, { controller: Controller.User, prefix: '/v1/user' });
  fastify.register(authRoutes, { controller: Controller.Auth, prefix: '/v1/auth' });

  done();
};

export default fp(routes);
