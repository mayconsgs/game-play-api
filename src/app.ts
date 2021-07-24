require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import cors from "cors";
import express from "express";
import schemaMiddleware from "./middlewares/schemaMiddleware";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(cors());
app.use(schemaMiddleware);

// Routes
app.use(routes);

export default app;
