// modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const path = require('path');

// types
import { Express, Request, Response } from "express";

// configures dotenv to load environment variables
dotenv.config();

// instance express app
const app: Express = express();

// middlewares
// config JSON and form data response
app.use(express.json());// to work with json
app.use(express.urlencoded({extended: false}));// to work with form data
// solve CORS
app.use(cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
    optionsSuccessStatus: 200}
));// if API and front-end will run in different domains get this line commented.


// custom routes
import { Router } from "./routes";

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use(Router);

export default app;
