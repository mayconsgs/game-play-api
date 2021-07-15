import database from "../database/connection";
import BaseModel from "./_baseModel";

interface EventProps {
  idGuild: string;
  idOwner: string;
  schedule: Date;
  category: "ranked" | "joke" | "duel";
  description: string;
}

class EventModel extends BaseModel {
  constructor() {
    super("event");
  }

  async create(data: EventProps) {
    return super.create({
      ...data,
      schedule: new Date(data.schedule),
    } as EventProps);
  }

  async update(data: EventProps) {
    return super.update({ ...data, updated_at: database.fn.now() });
  }
}

export const eventModel = new EventModel();
