import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { IAuthRoutes, Login } from '../@types/routes/auth';

const authRoutes: FastifyPluginCallback<IAuthRoutes> = (fastify: FastifyInstance, opts, done) => {
  const { prefix, controller } = opts;
  fastify.get<Login>(
    `${prefix}/refresh`,
    { preValidation: [fastify.authenticate] },
    async (req, res) => {
      const { email, password } = req.body;
      const [, match] = await fastify.to(controller.validatePassword(email, password));
      if (!match) throw fastify.httpErrors.unauthorized('Invalid password');
      res.code(200).send();
    }
  );

  done();
};

export default fp(authRoutes);
