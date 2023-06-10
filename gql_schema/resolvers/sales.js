import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    sales: async (parent, args, { req }, info) => {
      return await prisma.sales.findMany();
    },
    sale: async (parent, args, { req }, info) => {
      return prisma.sales.findUnique({
        where: {
          sale_Id: args.sale_Id,
        },
      });
    },
  },
  Mutation: {
    makeSale: async (parent, args, { req }, info) => {
      return await prisma.sales.create({
        where: {
          data: args,
        },
      });
    },
  },
};
