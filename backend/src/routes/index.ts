// modules
import express from "express";

// types
import { Express, Request, Response } from "express";

// routers
const router = express();


// users routes
router.use('/api/users', require('./user/User.routes'));

// photos routes
router.use('/api/photos', require('./photo/Photo.routes'));

// test route
router.get("/", (req: Request, res: Response) => {

    res.send('API working!!');

});


export { router as Router};
