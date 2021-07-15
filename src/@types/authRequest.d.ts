import { JwtData } from "@config/jwtConfig";
import { Request as DefaultRequest } from "express";

interface AuthRequest extends DefaultRequest {
  auth?: JwtData;
}

export default AuthRequest;
