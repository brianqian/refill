import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import BaseController from '../controllers/base.controller';
import UserController from '../controllers/user.controller';
import { Db } from '../types/common';
import userRoutes from './user.routes';

const routes: FastifyPluginCallback<Db> = async (fastify, db, done) => {
  const Controller = BaseController.build(db);

  fastify.register<UserController>(userRoutes, Controller.User);

  done();
};

export default fp(routes);
