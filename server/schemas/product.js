const {
  findAllProducts,
  findOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
  addImageProduct,
} = require("../models/product");

const Redis = require("ioredis");
const redis = new Redis(); // ini akan connect ke localhost:6379

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,
// });

// define schema / typedefs => untuk contract
const typeDefs = `#graphql
  type Product {
    _id: ID!
    name: String!
    price: Int
    stock: Int
    imgUrl: String
    authorId: ID
    author: User
    imageUrls: [Image]
  }

  type Image {
    name: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
  }

  input ProductUpdateInput {
    name: String
    price: Int
    stock: Int
    imgUrl: String
  }

  type Mutation {
    createProduct(name: String!, price: Int!, stock: Int!, imgUrl: String!): Product
    updateProductById(id: ID!, productPayload: ProductUpdateInput): Product
    deleteProductById(id: ID!): String
    addImageProduct(imgUrl: String!, id: ID!): Product
  }
`;

// resolvers => kalian define controllers kalian
const resolvers = {
  Query: {
    getAllProducts: async (_parent, _args, contextValue) => {
      // const userLogin = await contextValue.authentication();

      const productCache = await redis.get("products");

      if (productCache) {
        return JSON.parse(productCache);
      }

      const products = await findAllProducts();

      redis.set("products", JSON.stringify(products));
      return products;
    },
    getProductById: async (_, args, contextValue) => {
      const product = findOneProductById(args.id);

      return product;
    },
  },
  Mutation: {
    createProduct: async (_parent, args, contextValue) => {
      // const { userId } = await contextValue.authentication();
      const userId = "65b7e08011f1974c3b2bc9ce";

      const product = await createOneProduct({
        name: args.name,
        stock: args.stock,
        price: args.price,
        imgUrl: args.imgUrl,
        authorId: userId,
      });

      redis.del("products"); //invalidate cache

      return product;
    },
    updateProductById: async (_parent, args) => {
      const payload = {};

      if (args.productPayload.name != null) {
        payload.name = args.productPayload.name;
      }

      if (args.productPayload.stock != null) {
        payload.stock = args.productPayload.stock;
      }

      if (args.productPayload.price != null) {
        payload.price = args.productPayload.price;
      }

      if (args.productPayload.imgUrl != null) {
        payload.imgUrl = args.productPayload.imgUrl;
      }

      const product = await updateOneProduct(args.id, payload);

      return product;
    },
    deleteProductById: async (_parent, args) => {
      await deleteOneProduct(args.id);

      return `Successfully deleted product with id ${args.id}`;
    },
    addImageProduct: async (_parent, args) => {
      const product = await addImageProduct(args.id, args.imgUrl);

      return product;
    },
  },
};

module.exports = {
  productTypeDefs: typeDefs,
  productResolvers: resolvers,
};
