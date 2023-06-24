import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    subcategories: async (parent, args, { req }, info) => {
      return await prisma.product_subcategory.findMany();
    },
    subcategory: async (parent, args, { req }, info) => {
      return await prisma.product_subcategory.findUnique({
        where: { subcategory_Id: args.subcategory_Id },
      });
    },
  },
  Mutation: {
    createSubCategory: async (parent, args, { req }, info) => {
      return await prisma.product_subcategory.create({
        data: args,
      });
    },
  },
  Product_category: {
    product: async (parent, args, { req }, info) => {
      return await prisma.product.findMany({
        where: {
          product_subcategory_Id: parent.subcategory_Id,
        },
      });
    },
  },
};
