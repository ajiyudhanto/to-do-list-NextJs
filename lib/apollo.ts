import { withApollo } from "next-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: "http://localhost:8080/api/graphql", // Server URL (must be absolute)
    credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
  }),
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);