const {gql} = require("apollo-server-express");

const typeDefs = gql`
type User {
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Auth {
    token: String
    user: User
}

type Query {
    me: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
}
`;

module.exports = typeDefs