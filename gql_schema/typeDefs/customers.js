import gql from "graphql-tag";
//todo: remove password type
export default gql`
  extend type Query {
    getCustomer(customer_Id: String!): Customer!
    allCustomer: [Customer!]!
    customer: Customer!
  }

  extend type Mutation {
    signUp(
      customer_name: String!
      customer_phone: String
      customer_email: String
      customer_password: String!
      customer_DOB: DateTime
      customer_area: Area
    ): Customer
    signIn(
      customer_phone: String
      customer_email: String
      customer_password: String!
    ): Customer
    signOut: Boolean
  }
  type Customer {
    customer_password: String!
    customer_Id: ID!
    customer_name: String!
    customer_phone: String!
    customer_email: String!
    customer_DOB: DateTime
    created_at: DateTime
    updated_at: DateTime
    customer_area: Area
    role: Role
    sales: [Sales!]!
  }
`;
