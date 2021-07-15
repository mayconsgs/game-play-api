import Joi, { ObjectSchema } from "joi";

interface SchemaInterface {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";

  body?: ObjectSchema;
  query?: ObjectSchema;
}

const schemas: SchemaInterface[] = [
  {
    path: "/",
    method: "GET",
  },
  {
    path: "/users",
    method: "GET",
  },
  {
    path: "/user",
    method: "GET",
    query: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  },
  {
    path: "/user",
    method: "POST",
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
];

export default schemas;
