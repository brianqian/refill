import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { CreateUser, GetUser, IUserRoutes } from '../@types/routes/user';

const userRoutes: FastifyPluginCallback<IUserRoutes> = (fastify: FastifyInstance, opts, done) => {
  const { prefix, controller } = opts;

  fastify.get<GetUser>(`${prefix}/:id`, async (req, _res) => {
    const [err, user] = await fastify.to(controller.getUserById(req.id));
    if (err) throw err;
    fastify.assert(!!user, 404, 'User not found');
    return { user };
  });

  fastify.post<CreateUser>('/user', async (req, _res) => {
    const user = await controller.createUser(req.body);
    return { user };
  });

  done();
};

export default fp(userRoutes);
