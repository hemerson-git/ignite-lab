import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPH_CMS,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GRAPH_CREATION_TOKEN}`,
  },

  cache: new InMemoryCache(),
});
