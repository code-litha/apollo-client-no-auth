import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000", // hanya berlaku jika menggunakan mac & simulator
  // uri: "https://4l4mbhc5-4000.asse.devtunnels.ms/",
  cache: new InMemoryCache(),
});

export default client;
