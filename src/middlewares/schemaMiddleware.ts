import schemas from "@config/schemasConfig";
import { NextFunction, Request, Response } from "express";

async function schemaMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const path = request.path;
  const method = request.method;

  const schema = schemas.find((e) => e.method == method && e.path.test(path));

  if (!schema) return response.status(404).send("Route not found.");

  try {
    await schema.body?.validateAsync(request.body);
    await schema.query?.validateAsync(request.query);
  } catch (error) {
    return response.status(422).json(error.message);
  }

  next();
}

export default schemaMiddleware;
