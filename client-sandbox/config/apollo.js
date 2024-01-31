import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://4l4mbhc5-4000.asse.devtunnels.ms/",
  cache: new InMemoryCache(),
});

export default client;
