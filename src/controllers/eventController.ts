import { eventModel } from "@models/eventModel";
import { Request, Response } from "express";

class EventController {
  async post(request: Request, response: Response) {
    const [id] = await eventModel.create(request.body);

    return response.status(204).json({ id });
  }
}

export const eventController = new EventController();
