import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router";

//TODO: decide if this is needed
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>
    }
  }
}

const app = express();
const port = 4000;

const corsConfig: cors.CorsOptions = {
  origin: "http://localhost:4000",
  credentials: true,
};

app.use(cors(corsConfig));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
