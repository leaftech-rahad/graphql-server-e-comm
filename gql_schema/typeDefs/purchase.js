import gql from "graphql-tag";

export default gql`
  extend type Query {
    purchases: [Purchase!]!
    purchase(product_purchase_Id: String!): Purchase
  }
  extend type Mutation {
    makePurchase(
      purchased_product_Id: String
      product_price_per_pcs: Float!
      product_net_purchase_quantity: Int!
      product_net_purchase_price: Float!
      product_purchase_date: DateTime
      product_in_stock: Int
      product_manufacturing_date: DateTime
      product_expiry_date: DateTime
      product_moved_to_shelf: Boolean
      soldOut: Boolean
      seller_Id: String
      buyer_store_Id: String
    ): Purchase
  }
  type Purchase {
    product_purchase_Id: ID!
    purchased_product_Id: String
    product_price_per_pcs: Float!
    product_net_purchase_quantity: Int!
    product_net_purchase_price: Float!
    product_purchase_date: DateTime
    product_in_stock: Int
    product_manufacturing_date: DateTime
    product_expiry_date: DateTime
    product_moved_to_shelf: Boolean
    soldOut: Boolean
    seller_Id: String
    buyer_store_Id: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
