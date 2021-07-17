import { eventController } from "@controllers/eventController";
import { Router } from "express";

const publicRoutes = Router();
const privateRoutes = Router();

publicRoutes.post("/events", eventController.createEvent);
publicRoutes.post(
  "/events/:eventId/add",
  eventController.addParticipantToEvent
);

export { privateRoutes, publicRoutes };
