import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import swaggerUI from 'swagger-ui-express';
import swaggerJson from '../swagger.json';

import AppError from "./errors/AppError";
import routes from "./routes";

import "./container";
import "./database";

const app = express();

const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
