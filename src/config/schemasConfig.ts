import Joi, { ObjectSchema } from "joi";

interface SchemaInterface {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";

  body?: ObjectSchema;
  query?: ObjectSchema;
}

const schemas: SchemaInterface[] = [
  {
    path: "/event",
    method: "POST",
    body: Joi.object({
      idGuild: Joi.string().required(),
      idOwner: Joi.string().required(),
      schedule: Joi.date().required(),
      category: Joi.string().valid("ranked", "joke", "duel"),
      description: Joi.string().max(100),
    }),
  },
];

export default schemas;
