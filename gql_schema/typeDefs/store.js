import gql from "graphql-tag";

export default gql`
  extend type Query {
    stores: [Store!]!
    store(store_Id: ID!): Store
  }
  extend type Mutation {
    createStore(
      store_name: String!
      store_email: String
      store_area: Area
    ): Store
  }
  type Store {
    store_Id: ID!
    store_name: String!
    store_email: String
    store_code: Int
    store_area: Area
    Purchase: [Purchase!]!
  }
`;
