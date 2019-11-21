const { ApolloServer, gql } = require('apollo-server-express');
const { User } = require('./models');

const typeDefs = gql`
    type User {
        id: ID!
        userName: String
        email: String
    }
    type Query {
        getUsers: [User]
    }
    type Mutation {
        addUser(userName: String!, email: String!): User
    }
`;

const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const response = await User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
