import { eventController } from "@controllers/eventController";
import { Router } from "express";

const routes = Router();

routes.post("/events", eventController.createEvent);
routes.post(
  "/events/:eventId/participants",
  eventController.addParticipantToEvent
);

routes.get("/events", eventController.indexEvents);
routes.get(
  "/events/:eventId/participants",
  eventController.getParticipantsOfEvent
);

export { routes };
