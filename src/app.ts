import express from 'express';
import { createServer } from 'http';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The server is working!');
});

const server = createServer(app);

server.listen(port);