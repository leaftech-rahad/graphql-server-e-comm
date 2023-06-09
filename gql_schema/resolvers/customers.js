import prisma from "../../prisma/prisma.js";
import { ApolloServerValidationErrorCode } from "@apollo/server/errors";
import {
  signUp,
  signInWithEmail,
  signInWithPhone,
} from "../../Auth/Joi/index.js";
import {
  hashed_password,
  matched_password,
  checkSignedIn,
  checkSignedOut,
  signOut,
} from "../../Auth/bcrypt/index.js";

export default {
  Query: {
    getCustomer: async (parent, args, { req }, info) => {
      await checkSignedIn(req);
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
    signUp: async (parent, args, { req }, info) => {
      await checkSignedOut(req);
      const values = await signUp.validateAsync(args);
      const plain_password = values.customer_password;
      values.customer_password = hashed_password(values.customer_password);

      if (plain_password !== values.customer_password) {
        var data = await prisma.customer.create({
          data: values,
        });
      }

      const user = await prisma.customer.findUnique({
        where: {
          customer_Id: data.customer_Id,
        },
        select: {
          customer_Id: true,
        },
      });
      req.session.user = user.customer_Id;

      return user;
    },

    signIn: async (parent, args, { req, res }, info) => {
      if (req.session.user) {
        var user = await prisma.customer.findUnique({
          where: {
            customer_Id: req.session.user,
          },
        });
        if (user) {
          return user;
        } else {
          await signOut(req, res);
        }
      } else {
        if (args.customer_email) {
          var values = await signInWithEmail.validateAsync(args);
          var data = await prisma.customer.findUnique({
            where: { customer_email: values.customer_email },

            select: {
              customer_Id: true,
              customer_password: true,
            },
          });
        } else if (args.customer_phone) {
          var values = await signInWithPhone.validateAsync(args);
          var data = await prisma.customer.findUnique({
            where: { customer_phone: values.customer_phone },
            select: {
              customer_Id: true,
              customer_password: true,
            },
          });
        } else throw new ApolloServerValidationErrorCode(`Invalid Credentials`);

        var match = matched_password(
          values.customer_password,
          data.customer_password
        );
        if (match) {
          req.session.user = data.customer_Id;
          return data;
        } else throw new ApolloServerValidationErrorCode("Invalid Credentials");
      }
    },
    signOut: async (parent, args, { req, res }, info) => {
      return await signOut(req, res);
    },
  },
};
