import gql from "graphql-tag";

export default gql`
  extend type Query {
    getBrands: [Brand!]!
  }
  extend type Mutation {
    createBrand(brand_name: String): Brand
  }
  type Brand {
    brand_Id: ID!
    brand_name: String
    product: [Product!]!
  }
`;
