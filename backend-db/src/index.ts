import express, { Express } from 'express';
import { createServer } from 'http';
import { router } from "./Router";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
for (const route of router) {
  app.use(route.getPrefix(), route.getRouter());
}
const server = createServer(app);

server.listen(port);
