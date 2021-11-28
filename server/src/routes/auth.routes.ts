import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { Login } from '../@types/routes/auth';
import AuthController from '../controllers/auth.controller';

const authRoutes: FastifyPluginCallback<AuthController> = (fastify, controller, done) => {
  fastify.get<Login>('/refresh', async (req, _res) => {
    console.log(req);
  });

  done();
};

export default fp(authRoutes);
