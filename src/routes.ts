import { eventController } from "@controllers/eventController";
import { Router } from "express";

const publicRoutes = Router();
const privateRoutes = Router();

publicRoutes.post("/event", eventController.createEvent);
publicRoutes.post("/event/:eventId/add", eventController.addParticipantToEvent);

export { privateRoutes, publicRoutes };
