import gql from "graphql-tag";

export default gql`
  extend type Query {
    products: [Product!]!
  }

  extend type Mutation {
    createProduct(
      product_name: String!
      product_category_Id: String!
      product_subcategory_Id: String!
      product_manufacturing_date: DateTime
      product_expiry_date: DateTime
      product_description: String
      product_usages: String
      product_weight: Int
    ): Product
  }

  type Product {
    product_Id: String!
    product_name: String!
    product_category_Id: String!
    product_subcategory_Id: String!
    product_manufacturing_date: DateTime
    product_expiry_date: DateTime
    product_description: String
    product_usages: String
    product_weight: Int
    image: [Image!]!
    sales: [Sales!]!
    purchase_Id: String!
  }
`;
