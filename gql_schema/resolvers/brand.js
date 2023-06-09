import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getBrands: async (parent, args, { req, res }, info) => {
      //todo: auth, joi validation
      const data = await prisma.brand.findMany();
      return data;
    },
    getBrandByName: async (parent, args, { req, res }, info) => {
      //todo: auth, joi validation
      const data = await prisma.brand.findUnique({
        where: {
          brand_name: args.brand_name,
        },
      });
      return data;
    },
    getBrandById: async (parent, args, { req, res }, info) => {
      //todo: auth, joi validation
      const data = await prisma.brand.findUnique({
        where: {
          brand_Id: args.brand_Id,
        },
      });
      return data;
    },
  },
  Mutation: {
    createBrand: async (parent, args, { req, res }, info) => {
      //todo: auth, joi validation
      const data = await prisma.brand.create({
        data: values,
      });
      return data;
    },
  },
};
