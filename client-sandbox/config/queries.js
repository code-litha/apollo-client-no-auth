import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      _id
      name
      price
      stock
      imgUrl
    }
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  query GetProductById($getProductByIdId: ID!) {
    getProductById(id: $getProductByIdId) {
      _id
      name
      price
      stock
      imgUrl
      authorId
      author {
        _id
        username
        email
        password
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $price: Int!
    $stock: Int!
    $imgUrl: String!
  ) {
    createProduct(name: $name, price: $price, stock: $stock, imgUrl: $imgUrl) {
      _id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
