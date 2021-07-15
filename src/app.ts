require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import cors from "cors";
import express from "express";
import session from "express-session";
import authMiddleware from "./middlewares/authMiddleware";
import schemaMiddleware from "./middlewares/schemaMiddleware";
import { privateRoutes, publicRoutes } from "./routes";
const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(cors());
app.use(schemaMiddleware);

// Routes
app.use(publicRoutes);
app.use(authMiddleware);
app.use(privateRoutes);

export default app;
