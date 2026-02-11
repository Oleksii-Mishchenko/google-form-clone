import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';

const typeDefs = `
  type Query {
    hello: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL server 🚀'
  }
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql')
})
