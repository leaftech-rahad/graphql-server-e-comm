import { addAbortSignal } from "stream";
import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    stores: async (parent, args, { req }, info) => {
      const data = await prisma.store.findMany({});
      return data;
    },
    store: async (parent, args, { req }, info) => {
      const data = await prisma.store.findUnique({
        where: {
          store_Id: args.store_Id,
        },
      });
      return data;
    },
  },
  Mutation: {
    createStore: async (parent, args, { req }, info) => {
      const values = args;
      const data = await prisma.store.create({
        data: values,
      });
      return data;
    },
  },
};
