const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
    _id: ID!
    email: String!
    savedLocs: [String]
    }

    type Auth {
        user: User
        token: ID
    }

    type Query {
        getUsers: [User]
        me(email: String!): Auth
    }

    type Mutation {
        addUser(email: String! password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveLocation(email: String! password: String! location: String!): Auth
    }
`

module.exports = typeDefs;