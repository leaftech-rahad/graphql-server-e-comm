import gql from "graphql-tag";

export default gql`
  extend type Query {
    products: [Product!]!
    getProductByName(product_name: String!): [Product!]!
    getProductById(product_Id: String!): Product
    getProductByCategoryId(product_category_Id: String!): [Product!]!
    getProductBySubCategoryId(product_subcategory_Id: String!): [Product!]!
  }

  extend type Mutation {
    createProduct(
      product_name: String!
      product_description: String
      product_usages: String
      product_weight: Int
      product_category_Id: String!
      product_subcategory_Id: String!
      product_brand_Id: String
    ): Product
  }

  type Product {
    product_Id: ID!
    product_name: String!
    product_description: String
    product_usages: String
    product_weight: Int
    image: [Image!]!
    product_category_Id: String!
    product_subcategory_Id: String!
    product_brand_Id: String
    purchase: [Purchase!]!
    sales: [Sales!]!
  }
`;
