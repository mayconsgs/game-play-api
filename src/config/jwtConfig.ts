import jwt from "jsonwebtoken";
import JwtData from "src/@types/jwtData";

class JwtConfig {
  public secret: string = process.env.JWT_SECRET;

  verify(token: string) {
    return jwt.verify(token, this.secret) as JwtData;
  }

  generateToken(data: JwtData) {
    return jwt.sign(data, this.secret);
  }
}

export default new JwtConfig();
