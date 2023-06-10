import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    purchases: async (parent, args, { req }, info) => {
      return await prisma.purchase.findMany({});
    },
    purchase: async (parent, args, { req }, info) => {
      return await prisma.purchase.findUnique({
        where: {
          product_purchase_Id: args.product_purchase_Id,
        },
      });
    },
  },
  Mutation: {
    makePurchase: async (parent, args, { req }, info) => {
      return await prisma.purchase.create({
        data: args,
      });
    },
  },
};
