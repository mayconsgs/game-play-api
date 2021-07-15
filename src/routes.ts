import { eventController } from "@controllers/eventController";
import { Router } from "express";

const publicRoutes = Router();
const privateRoutes = Router();

publicRoutes.post("/event", eventController.post);

export { privateRoutes, publicRoutes };
