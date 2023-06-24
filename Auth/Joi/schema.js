import Joi from "joi";

const ID = Joi.string().guid({
  version: ["uuidv4"],
});

const name = Joi.string().required().min(4).max(25);

const email = Joi.string().required();

const password = Joi.string()
  /* .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/) */
  .required();

const phone = Joi.string()
  .regex(/^[0-9]+$/)
  /* .min(11)
  .max(11) */
  .required();

const description = Joi.string().alphanum();

const [customer_name, customer_email, customer_password, customer_phone] = [
  name,
  email,
  password,
  phone,
];

export const signUp = Joi.object().keys({
  customer_name,
  customer_email,
  customer_password,
  customer_phone,
});

export const signInWithPhone = Joi.object().keys({
  customer_password,
  customer_phone,
});

export const signInWithEmail = Joi.object().keys({
  customer_email,
  customer_password,
});
