import gql from "graphql-tag";

export default gql`
  extend type Query {
    getSales: [Sales!]!
  }
  extend type Mutation {
    sale(
      customer_Id: String!
      product_Id: String!
      product_pcs: Int!
      sale_net_price: Float!
      paid_in_cash: PayMethod!
    ): Sales
  }
  type Sales {
    sale_Id: ID!
    customer_Id: String!
    sale_date: DateTime!
    product_Id: String!
    product_pcs: Int!
    sale_net_price: Float!
    paid_in_cash: PayMethod!
  }
`;
