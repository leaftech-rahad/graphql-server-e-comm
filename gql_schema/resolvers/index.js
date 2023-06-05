import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import customers from "./customers.js";
import store from "./store.js";

export default [{ Upload: GraphQLUpload }, customers, store];
