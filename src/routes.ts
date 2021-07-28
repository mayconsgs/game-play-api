import { eventController } from "@controllers/eventController";
import { participantController } from "@controllers/participantController";
import { Router } from "express";

const routes = Router();

routes.get("/events", eventController.index);
routes.post("/events", eventController.create);

routes.get("/events/:eventId/participants", participantController.index);
routes.post("/events/:eventId/participants", participantController.create);

export { routes };
