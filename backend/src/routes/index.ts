// modules
import express from "express";

// types
import { Express, Request, Response } from "express";

// routers
const router = express();
import { userRouter } from "./user";

// users routes
router.use('/api/users', userRouter);

// photos routes
// outer.use('/api/photos', require('./photo/Photo.routes'));

// test route
router.get("/", (req: Request, res: Response) => {

    res.send('API working!!');

});


export { router as Router};
