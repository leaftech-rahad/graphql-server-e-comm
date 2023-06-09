import bcrypt from "bcryptjs";
import prisma from "../../prisma/prisma.js";
import { GraphQLError } from "graphql";

export const hashed_password = (password) => {
  const hashed = bcrypt.hashSync(password, 10);
  if (hashed !== password) return hashed;
  else {
    throw new Error("not a valid password");
  }
};

export const matched_password = (password, hash) =>
  bcrypt.compareSync(password, hash);

export const checkSignedIn = async (req) => {
  if (!req.session.user) {
    throw new GraphQLError("You are not signed in.", {
      extensions: {
        code: "UNAUTHENTICATED",
        // myExtension: "foo",
      },
    });
  }
};

export const checkSignedOut = async (req) => {
  if (req.session.user) {
    throw new GraphQLError("Your already signed in.", {
      extensions: {
        code: "UNAUTHENTICATED",
        // myExtension: "foo",
      },
    });
  }
};

export const signOut = async (req, res) =>
  new Promise((resolve, reject) => {
    //clearing cookie with session name
    res.clearCookie(SESS_NAME);

    //destroying session instance of user
    req.session.destroy((err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
