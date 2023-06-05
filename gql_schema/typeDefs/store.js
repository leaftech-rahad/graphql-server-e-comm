import gql from "graphql-tag";

export default gql`
  extend type Query {
    getStores: [Store!]!
  }
  extend type Mutation {
    createStore(
      store_Name: String!
      store_Email: String
      store_code: Int!
      store_area: Area!
    ): Store
  }
  type Store {
    store_Id: ID!
    store_Name: String!
    store_Email: String
    store_code: Int
    store_area: Area
    Customer: [Customer]
    Purchase: [Purchase]
  }
`;
