import { eventModel } from "@models/eventModel";
import { participantsModel } from "@models/participantsModel";
import { Request, Response } from "express";

class EventController {
  async createEvent(request: Request, response: Response) {
    const { participants, ...event } = request.body;

    const [eventId] = await eventModel.create(event);

    const part = participants.map((idUser: string) => {
      return { eventId, idUser };
    });

    await participantsModel.create(part);

    return response.status(201).json({ eventId });
  }

  async addParticipantToEvent(request: Request, response: Response) {
    const { eventId } = request.params;
    const { idUser } = request.body;

    await participantsModel.create({ eventId, idUser });
  }
}

export const eventController = new EventController();
