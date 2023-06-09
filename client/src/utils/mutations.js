import {gql} from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        password
        username
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        password
        savedBooks {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }`


// export const LOGUN