import bcryptConfig from "@config/bcryptConfig";
import jwtConfig from "@config/jwtConfig";
import userModel from "@models/userModel";
import { Request, Response } from "express";
import AuthRequest from "src/@types/authRequest";
import { v4 as uuid } from "uuid";
class UserController {
  async get(request: AuthRequest, response: Response) {
    const usersList = await userModel.index();

    return response.status(200).json(usersList);
  }

  async getById(request: AuthRequest, response: Response) {
    const { userId } = request.query;

    try {
      const user = await userModel.get({ id: userId });
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
    }
  }

  async post(request: Request, response: Response) {
    const { password } = request.body;

    const passwordHash = await bcryptConfig.hash(password);

    const id = uuid();

    try {
      await userModel.create({
        id,
        ...request.body,
        password: passwordHash,
      });
    } catch (error) {
      console.error(error);
    }

    return response.status(201).json({
      token: jwtConfig.generateToken({ id }),
    });
  }

  async put(request: AuthRequest, response: Response) {
    const { body: data } = request;

    const updated = await userModel.update(data);

    if (updated) {
      return response.json({ message: "Usuário atualizado" });
    } else {
      return response.json({ message: "Não foi possível atualizar usuário" });
    }
  }

  async delete(request: AuthRequest, response: Response) {
    const { query } = request;

    const deleted = await userModel.destroy(query);

    if (deleted) {
      return response.json({ message: "Usuário deletado" });
    } else {
      return response.json({ message: "Não foi possível deletar usuário" });
    }
  }
}

export default new UserController();
