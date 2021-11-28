import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { CreateUser, GetUser } from '../@types/routes';
import UserController from '../controllers/user.controller';

const userRoutes: FastifyPluginCallback<UserController> = (fastify, controller, done) => {
  fastify.get<GetUser>('/user/:id', async (req, _res) => {
    const user = await controller.getUserById(req.id);
    console.log(user);
    return user;
  });

  fastify.post<CreateUser>('/user', async (req, _res) => {
    const user = await controller.createUser(req.body);
    return user;
  });

  done();
};

export default fp(userRoutes);
