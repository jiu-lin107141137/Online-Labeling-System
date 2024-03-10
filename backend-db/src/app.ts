import express from 'express';
import { createServer } from 'http';
import { router } from "./Router";

const app: express.Application = express();
const port = 3000;

for (const route of router) {
  app.use(route.getPrefix(), route.getRouter());
}
const server = createServer(app);

server.listen(port);
