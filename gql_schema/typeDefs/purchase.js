import gql from "graphql-tag";

export default gql`
  extend type Query {
    allPurchase: [Purchase!]!
  }
  extend type Mutation {
    makePurchase(
      product_net_purchase_price: Float!
      product_price_per_pcs: Float!
      product_net_purchase_quantity: Int!
      product_purchase_date: DateTime
      product_in_stock: Int
      seller_Id: String!
      buyer_store_Id: String!
    ): Purchase
  }
  type Purchase {
    product_purchase_Id: ID!
    product_net_purchase_price: Float!
    product_price_per_pcs: Float!
    product_net_purchase_quantity: Int!
    product_purchase_date: DateTime
    product_in_stock: Int
    createdAt: DateTime

    product: Product

    seller_Id: Supplier

    buyer_store_Id: Store
  }
`;
