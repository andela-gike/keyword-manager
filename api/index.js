const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Category = require('./resolvers/Category');
const Keyword = require('./resolvers/Keyword');


// 2
const resolvers = {
  Query,
  Mutation,
  Category,
  Keyword
}

const options = {
  port: 4001,
}

// 3
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma }
  },
})

server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`))