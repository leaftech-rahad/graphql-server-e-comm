import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import customers from "./customers.js";
import store from "./store.js";
import product from "./product.js";
import brand from "./brand.js";

export default [{ Upload: GraphQLUpload }, customers, store, product, brand];
