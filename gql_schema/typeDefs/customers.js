import gql from "graphql-tag";

export default gql`
  extend type Query {
    getCustomer(customer_Id: ID!): Customer!
    allCustomer: [Customer]
  }

  extend type Mutation {
    createCustomer(
      customer_Name: String!
      customer_phone: String!
      customer_email: String
      customer_DOB: DateTime
      customer_area: Area
      customer_registration_store_Id: String!
    ): Customer
  }
  type Customer {
    customer_Id: ID!
    customer_Name: String!
    customer_phone: String!
    customer_email: String
    customer_DOB: DateTime
    created_at: DateTime
    updated_at: DateTime
    customer_area: Area
    customer_registration_store_Id: String
    sales: [Sales]
  }
`;
