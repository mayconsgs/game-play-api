import userController from "@controllers/userController";
import { Router } from "express";

const publicRoutes = Router();
const privateRoutes = Router();

publicRoutes.get("/", (request, response) => {
  response.json({ message: "Hello Word!" });
});

privateRoutes.get("/users", userController.get);
privateRoutes.get("/user", userController.getById);
publicRoutes.post("/user", userController.post);
privateRoutes.delete("/user", userController.delete);
privateRoutes.put("/user", userController.put);

export { privateRoutes, publicRoutes };
