import prisma from "../../prisma/prisma.js";
import Joi from "joi";
import { signUp } from "../../Auth/Joi/index.js";

export default {
  Query: {
    getCustomer: async (parent, args, { req }, info) => {
      const data = await prisma.customer.findUnique({
        where: {
          customer_Id: args.customer_Id,
        },
      });
      console.log(req);
      return data;
    },
    allCustomer: async (parent, args, context, info) => {
      const data = await prisma.customer.findMany({});
      return data;
    },
  },
  Mutation: {
    createCustomer: async (parent, args, { req }, info) => {
      const values = await signUp.validateAsync(args);

      const data = await prisma.customer.create({
        data: values,
      });
      const user = await prisma.customer.findUnique({
        where: {
          customer_Id: data.customer_Id,
        },
      });
      return user;
    },
  },
};
