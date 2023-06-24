import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    products: async (parent, args, { req }, info) => {
      //todo: add auth, joi validation, pagination
      const data = await prisma.product.findMany();
      return data;
    },
    getProductByName: async (patent, args, { req, res }, info) => {
      //todo: add auth, joi validation
      const data = await prisma.product.findMany({
        where: {
          product_name: {
            contains: args.product_name,
            mode: "insensitive",
          },
        },
      });
      return data;
    },
    getProductById: async (patent, args, { req, res }, info) => {
      //todo: add auth, joi validation
      const data = await prisma.product.findUnique({
        where: {
          product_Id: args.product_Id,
        },
      });
      return data;
    },
    getProductByCategoryId: async (patent, args, { req, res }, info) => {
      //todo: add auth, joi validation
      const data = await prisma.product.findMany({
        where: {
          product_category_Id: args.product_category_Id,
        },
      });
      return data;
    },
    getProductBySubCategoryId: async (patent, args, { req, res }, info) => {
      //todo: add auth, joi validation
      const data = await prisma.product.findMany({
        where: {
          product_subcategory_Id: args.product_subcategory_Id,
        },
      });
      return data;
    },
  },
  Mutation: {
    createProduct: async (parent, args, { req, res }, info) => {
      //todo: add auth, joi validation
      const data = await prisma.product.create({
        data: args,
      });
      return data;
    },
  },
};
