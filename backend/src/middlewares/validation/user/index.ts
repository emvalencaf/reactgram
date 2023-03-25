import { Request } from "express";

const { body } = require('express-validator');

// sign up user  validation
export const userCreateValidation  = () => {

    return [

        body('name')
            .isString().withMessage("user name is a required field ")
            .isLength({min: 3}).withMessage('user name must have at least 3 characters')
            ,
        body('email')
            .isString().withMessage("user email is a required field")
            .isEmail().withMessage("user email must be a valid email"),
        body('password')
            .isString().withMessage("user password is a required field")
            .isLength({min: 5}).withMessage('user password must have at least 5 characters'),
        body('confirmPassword')
            .isString().withMessage("user confirm password is a required field")
            .custom((value: string, { req }: { req: Request }) => {
                if(value != req.body.password) throw new Error("user password and confirm password fields must have equal values.");
                return true;
            })

    ];

};

// sign in user validation
export const loginValidation = () => {
    return [
        body('email')
            .isString().withMessage("user email is a required field")
            .isEmail().withMessage("user email must be a valid email"),
        body('password')
            .isString().withMessage("user password is a required field")
    ];
};

// update user profile validation
export const userUpdateValidation = () => {

    return [
        body('name')
            .optional()
            .isLength({min: 3}).withMessage('user name must have at least 3 character'),
        body('password')
            .optional()
            .isLength({min: 5}).withMessage('user password must have at least 3 character'),
    ]

};
