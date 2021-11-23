import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import UserController from '../controllers/user.controller';
import { GetUserParams } from '../types/route';

const userRoutes: FastifyPluginCallback<UserController> = (fastify, controller, done) => {
  fastify.get<GetUserParams>('/user/:id', async (req, res) => {
    const user = await controller.getUser(req.id);
    console.log(user);
    return user;
  });
  fastify.post('/user', async (req, res) => {
    const user = await controller.createUser(req.body);
    console.log(user);
    return user;
  });

  done();
};

export default fp(userRoutes);
