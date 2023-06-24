import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    suppliers: async (parent, args, { req }, info) => {
      return await prisma.supplier.findMany();
    },
    supplier: async (parent, args, { req }, info) => {
      return await prisma.supplier.findUnique({
        where: { supplier_Id: args.supplier_Id },
      });
    },
  },
  Mutation: {
    createSupplier: async (parent, args, { req }, info) => {
      return await prisma.supplier.create({
        data: args,
      });
    },
  },
  Supplier: {
    purchase: async (parent, args, { req }, info) => {
      return await prisma.purchase.findMany({
        where: { seller_Id: parent.seller_Id },
      });
    },
  },
};
