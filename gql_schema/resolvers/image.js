import { finished } from "stream/promises";
import path from "node:path";
import prisma from "../../prisma/prisma.js";
import os from "node:os";
import fs from "fs";

export default {
  Query: {
    getImage: async (parent, args, { req }, info) => {
      return await prisma.image.findMany({
        where: {
          product_Id: args.product_Id,
        },
      });
    },
  },
  Mutation: {
    image_upload: async (
      parent,
      { file, product_Id, image_description },
      { req },
      info
    ) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const filePath = path.join(process.cwd(), `/public/images/${filename}`);

      // const filePath = path.join(os.tmpdir(), `images/${product_Id}`);
      const data = await prisma.image.create({
        data: {
          product_Id,
          image_description,
        },
      });
      const out = fs.createWriteStream(filePath);
      stream.pipe(out);
      await finished(out);
      console.log(data);
      return true;
    },
  },
};
