import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router";

//TODO: decide if this is needed
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

const app = express();
const port = 4000;

const corsConfig: cors.CorsOptions = {
  // origin: function(origin, callback) {
  //   const allowedOrigins = ['http://localhost:5173/app/signup'];
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, origin);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // methods: function (origin, callback) {
  //   if (origin === 'http://localhost:5173/app/signup') {
  //     callback(null, ['POST']);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  origin: ['http://localhost:5173', 'http://localhost:5173/signup', 'http://localhost:5173/signin', 'http://localhost:5173/offer', 'http://localhost:5173/app'],
  methods: ["GET", "POST", "DELETE", "UPDATE"],
  // origin: ['http://localhost:5173'],
  allowedHeaders: ["Content-Type", "Authorization"],
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
