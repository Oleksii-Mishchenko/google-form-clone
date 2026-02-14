import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  maskedErrors: false,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
