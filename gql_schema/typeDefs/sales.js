import gql from "graphql-tag";

export default gql`
  extend type Query {
    sales: [Sales!]!
    sale(sale_Id: String!): Sales
  }
  extend type Mutation {
    makeSale(
      customer_Id: String!
      product_Id: String!
      product_pcs: Int!
      sale_net_price: Float!
      canceled_order: Boolean
      refunded_order: Boolean
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
    canceled_order: Boolean
    refunded_order: Boolean
    paid_in_cash: PayMethod!
  }
`;
