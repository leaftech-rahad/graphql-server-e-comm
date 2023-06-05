import gql from "graphql-tag";

export default gql`
  extend type Query {
    getImage(product_Id: String!): [Image!]!
  }
  extend type Mutation {
    image_upload(file: Upload!, product_Id: String!): Image!
  }
  type Image {
    image_Id: ID!
    filename: String!
    product_Id: Product!
    image_description: String
    mimetype: String!
    encoding: String!
  }
`;
