import Fastify from 'fastify';

const server = Fastify({
  logger: true,
});

server.get('/ping', async (_request, _reply) => {
  const temp = 'hello';
  return temp;
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
