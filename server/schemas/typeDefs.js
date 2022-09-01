const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
    _id: ID!
    email: String!
    password: String!
    }

    type Auth {
        user: User
        token: ID
    }

    type Query {
        getUsers: [User]
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;