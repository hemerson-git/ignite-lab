import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPH_CMS,
  cache: new InMemoryCache(),
});
