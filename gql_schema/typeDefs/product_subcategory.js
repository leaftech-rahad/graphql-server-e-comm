import gql from "graphql-tag";

export default gql`
  extend type Query {
    categories: [Product_category!]!
  }
  extend type Mutation {
    createSubCategory(
      category_name: String!
      category_description: String
      product_category_Id: String!
    ): Product_category!
  }
  type Product_subcategory {
    subcategory_Id: ID!
    subcategory_name: String
    subcategory_description: String
    product_category_Id: String!
    product: [Product!]!
  }
`;
