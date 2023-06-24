import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    categories: async (parent, args, { req }, info) => {
      return await prisma.product_category.findMany();
    },
    category: async (parent, args, { req }, info) => {
      return await prisma.product_category.findUnique({
        where: { category_Id: args.category_Id },
      });
    },
  },
  Mutation: {
    createCategory: async (parent, args, { req }, info) => {
      return await prisma.product_category.create({
        data: args,
      });
    },
  },
  Product_category: {
    subcategory: async (parent, args, { req }, info) => {
      return await prisma.product_subcategory.findMany({
        where: {
          product_category_Id: parent.category_Id,
        },
      });
    },
  },
  Product_category: {
    product: async (parent, args, { req }, info) => {
      return await prisma.product.findMany({
        where: {
          product_category_Id: parent.category_Id,
        },
      });
    },
  },
};
