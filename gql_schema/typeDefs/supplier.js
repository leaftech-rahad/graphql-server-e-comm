import gql from "graphql-tag";

export default gql`
  extend type Query {
    suppliers: [Supplier!]!
    supplier(supplier_Id: String!): Supplier
  }
  extend type Mutation {
    createSupplier(
      supplier_name: String!
      supplier_email: String
      supplier_phone: String!
      supplier_store_name: String!
      supplier_area: Area
    ): Supplier
  }
  type Supplier {
    supplier_Id: ID!
    supplier_name: String!
    supplier_email: String
    supplier_phone: String!
    supplier_store_name: String!
    supplier_area: Area
    createdAt: DateTime
    updatedAt: DateTime
    purchase: [Purchase!]!
  }
`;
