import { Request, Response } from "express";
import database from "../database/connection";

class EventController {
  async createEvent(request: Request, response: Response) {
    const { participants, ...event } = request.body;

    try {
      const [eventId] = await database("event").insert(event).returning("id");
      const parts = participants.map((idUser: string) => {
        return { eventId, idUser };
      });

      await database("participants").insert(parts);

      return response.status(201).json({ eventId });
    } catch (error) {
      return response.status(409).send("Ocorreu um erro ao inserir o evento");
    }
  }

  async addParticipantToEvent(request: Request, response: Response) {
    const { eventId } = request.params;
    const { idUser } = request.body;

    try {
      await database("participants").insert({ eventId, idUser });

      return response.status(204).send();
    } catch (error) {
      return response
        .status(409)
        .send("Ocorreu um error ao inserir um novo participante");
    }
  }
}

export const eventController = new EventController();
