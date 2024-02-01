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

export const GET_PRODUCTS_DI_CREATE = gql`
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
      price
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProductById($productId: ID!) {
    getProductById(id: $productId) {
      _id
      name
      price
      stock
      imgUrl
      authorId
    }
  }
`;
