import bcrypt from "bcryptjs";

export const hashed_password = (password) => {
  const hashed = bcrypt.hashSync(password, 10);
  if (hashed !== password) return hashed;
  else {
    throw new Error("not a valid password");
  }
};

export const matched_password = (password) =>
  bcrypt.compareSync(password, hash);
