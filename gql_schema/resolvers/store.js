import { addAbortSignal } from "stream";
import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getStores: async () => {
      const data = await prisma.store.findMany({});
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
