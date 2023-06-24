import gql from "graphql-tag";

export default gql`
  extend type Query {
    getImage(product_Id: String!): [Image]
  }
  extend type Mutation {
    image_upload(
      file: Upload!
      product_Id: String
      image_description: String
    ): Boolean
  }
  type Image {
    image_Id: ID!
    product_Id: Product
    image_description: String
  }
`;
