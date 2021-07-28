import Joi, { ObjectSchema } from "joi";

interface SchemaInterface {
  path: RegExp;
  method: "GET" | "POST" | "PUT" | "DELETE";

  body?: ObjectSchema;
  query?: ObjectSchema;
}

const schemas: SchemaInterface[] = [
  {
    path: new RegExp("^/events$"),
    method: "GET",
    query: Joi.object({
      idUser: Joi.string(),
      guilds: Joi.alternatives().try(
        Joi.array().items(Joi.string()).required(),
        Joi.string().required()
      ),
    }),
  },
  {
    path: new RegExp("^/events$"),
    method: "POST",
    body: Joi.object({
      idGuild: Joi.string().required(),
      idOwner: Joi.string().required(),
      schedule: Joi.date().required(),
      category: Joi.string().valid("ranked", "joke", "duel"),
      description: Joi.string().max(100),
      participants: Joi.array().items(Joi.string().required()).required(),
    }),
  },
  {
    path: new RegExp(
      "^/events/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/participants$"
    ),
    method: "POST",
    body: Joi.object({
      idUser: Joi.string().required(),
    }),
  },
  {
    path: new RegExp(
      "^/events/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/participants$"
    ),
    method: "GET",
  },
];

export default schemas;
