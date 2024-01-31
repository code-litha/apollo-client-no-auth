require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { productTypeDefs, productResolvers } = require("./schemas/product");
const { mongoConnect } = require("./config/mongoConnection");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const authentication = require("./utils/auth");

const server = new ApolloServer({
  typeDefs: [productTypeDefs, userTypeDefs],
  resolvers: [productResolvers, userResolvers],
  introspection: true, // untuk ketika deploy, apollo playground tetap bisa diakses
});

(async () => {
  await mongoConnect();
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      return {
        authentication: () => authentication(req),
      };
    },
    listen: {
      port: Number(process.env.PORT) || 4000,
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
