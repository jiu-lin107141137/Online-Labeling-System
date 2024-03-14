import express, { Express } from 'express';
import { createServer } from 'http';
import { router } from "./Router";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  // if(whiteList.includes(req.headers.origin))
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin ?? '*'); // The second indicates the url allowed to fetch data via this api
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  console.log(`${req.ip} -- [${currentDatetime()}] "${req.method} ${req.path}"`);
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  else
    next();
})


for (const route of router) {
  app.use(route.getPrefix(), route.getRouter());
}
const server = createServer(app);

server.listen(port);

function currentDatetime() {
  const currentDateTime = new Date();

  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(currentDateTime.getDate()).padStart(2, '0');
  const hours = String(currentDateTime.getHours()).padStart(2, '0');
  const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
