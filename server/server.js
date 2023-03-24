const express = require('express');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./config/connection');
const routes = require('./routes');

// Define your GraphQL type definitions and resolvers here
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const PORT = process.env.PORT || 3001;

// Function to start the server
const startServer = async () => {
  // Wait for the ApolloServer to start
  await server.start();

  // Apply the ApolloServer middleware to the Express app
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', async () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });

  db.on('error', (err) => {
    console.log(err);
    process.exit(1);
  });
};

// Call the startServer function to start the server
startServer();