const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require('express');
const cors = require('cors');

async function startServer() {
  const app = express();

  const typeDefs = `
    type Todo { 
      id: ID!
      title: String!
      completed: Boolean!
    }

    type Query {
      getTodos: [Todo]
    }
  `;

  const resolvers = {
    Query: {
      getTodos: () => [
        { id: "1", title: "Learn GraphQL", completed: false },
        { id: "2", title: "Build a GraphQL API", completed: true },
      ],
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middleware BEFORE the GraphQL endpoint
  app.use(cors());
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  app.listen(4000, () => console.log("🚀 Server Started on http://localhost:4000/graphql"));
}

startServer();