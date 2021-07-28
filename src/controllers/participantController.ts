import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import database from "../database/connection";

class ParticipantController {
  async index(request: Request, response: Response) {
    const { eventId } = request.params;

    const participants = await database("participants")
      .select("idUser")
      .where({ eventId });

    return response.json(participants);
  }
  async create(request: Request, response: Response) {
    const { eventId } = request.params;
    const { idUser } = request.body;

    try {
      await database("participants").insert({ eventId, idUser });

      return response.status(201).json({ idUser });
    } catch (error) {
      return response
        .status(409)
        .send("Não foi possível adicionar esse usuário ao evento");
    }
  }
}

export const participantController = new ParticipantController();
