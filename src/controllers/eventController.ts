import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import database from "../database/connection";

interface eventProps {
  idGuild: string;
  idOwner: string;
  schedule: string;
  category: string;
  description: string;
  participants: string[];
}

class EventController {
  async indexEvents(request: Request, response: Response) {
    const { idUser, guilds } = request.query;

    try {
      const events = await database({ e: "event" })
        .select(
          "eventId",
          "idGuild",
          "idOwner",
          "schedule",
          "category",
          "description"
        )
        .innerJoin({ p: "participants" }, "p.eventId", "e.id")
        .where(idUser ? { idUser } : true)
        .whereIn("idGuild", guilds as string[]);

      return response.json(events);
    } catch (error) {
      return response.status(409).send("Não listar os eventos");
    }
  }

  async createEvent(request: Request, response: Response) {
    const { participants, schedule, ...event } = request.body as eventProps;

    const trx = await database.transaction();

    try {
      const eventId = uuid();
      await trx("event").insert({
        ...event,
        id: eventId,
        schedule: new Date(schedule),
      });

      const parts = participants.map((idUser: string) => {
        return { eventId, idUser };
      });
      await trx("participants").insert(parts);

      await trx.commit();

      return response.status(201).json({ eventId });
    } catch (error) {
      await trx.rollback();
      return response.status(409).send("Não foi possível inserir este evento");
    }
  }

  async getParticipantsOfEvent(request: Request, response: Response) {
    const { eventId } = request.params;

    const participants = await database("participants")
      .select("idUser")
      .where({ eventId });

    return response.json(participants);
  }
  async addParticipantToEvent(request: Request, response: Response) {
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

export const eventController = new EventController();
