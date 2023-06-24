import gql from "graphql-tag";

export default gql`
  extend type Query {
    subcategories: [Product_subcategory!]!
    subcategory(subcategory_Id: String!): Product_subcategory
  }
  extend type Mutation {
    createSubCategory(
      subcategory_name: String
      subcategory_description: String
      product_category_Id: String!
    ): Product_subcategory!
  }
  type Product_subcategory {
    subcategory_Id: ID!
    subcategory_name: String
    subcategory_description: String
    product_category_Id: String!
    product: [Product!]!
  }
`;
