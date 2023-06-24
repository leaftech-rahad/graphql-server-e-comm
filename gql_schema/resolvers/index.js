import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import customers from "./customers.js";
import store from "./store.js";
import products from "./products.js";
import brand from "./brand.js";
import image from "./image.js";
import product_category from "./product_category.js";
import product_subcategory from "./product_subcategory.js";
import purchase from "./purchase.js";
import sales from "./sales.js";
import supplier from "./supplier.js";

export default [
  { Upload: GraphQLUpload },
  customers,
  store,
  products,
  brand,
  image,
  product_category,
  product_subcategory,
  purchase,
  sales,
  supplier,
];
