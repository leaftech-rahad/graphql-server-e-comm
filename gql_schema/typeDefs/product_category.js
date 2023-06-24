import gql from "graphql-tag";

export default gql`
  extend type Query {
    categories: [Product_category]
    category(category_Id: String!): Product_category
  }
  extend type Mutation {
    createCategory(
      category_name: String!
      category_description: String
    ): Product_category
  }
  type Product_category {
    category_Id: ID!
    category_name: String
    category_description: String
    subcategory: [Product_subcategory!]!
    product: [Product!]!
  }
`;
