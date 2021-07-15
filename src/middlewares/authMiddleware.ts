import jwtConfig from "@config/jwtConfig";
import { NextFunction, Response } from "express";
import AuthRequest from "src/@types/authRequest";

function authMiddleware(
  request: AuthRequest,
  response: Response,
  next: NextFunction
) {
  if (!request.headers.authorization)
    return response.status(401).send("No token provided");

  const parts = request.headers.authorization.split(" ");

  if (parts.length != 2 || parts[0] != "Bearer")
    return response.status(401).send("Token bad formated");

  try {
    request.auth = jwtConfig.verify(parts[1]);
  } catch (error) {
    return response.status(401).send("Invalid token");
  }

  next();
}

export default authMiddleware;
