// modules
import { validationResult } from 'express-validator';

// types
import { NextFunction, Request, Response } from "express";

// validation
const validate = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if(errors.isEmpty()) return next();

    const extractedErrors: string[] = [];

    errors.array().map( err => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors: extractedErrors[0]
    });
};

export default validate;
