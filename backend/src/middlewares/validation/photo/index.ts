// module
import { body } from 'express-validator';


// create a photo validation
export const photoInsertValidation = () => {

    return [
        body('title')
            .not()
            .equals('undefined').withMessage('photo title is a required field')
            .isString().withMessage('photo title is a required field')
            .isLength({min: 3}).withMessage("photo title must have at least 3 character"),
        body('image')
            .custom((value: string, {req}) => {

                if(!req.file) throw new Error("you must upload a image")

                return true;
            })
    ];

};

const photoUpdateValidation = () => {
    return [
        body('title')
            .optional()
            .isString().withMessage("O título é obrigatório.")
            .isLength({min: 3}).withMessage("O título precisa ter no mínimo 3 caracteres.")
    ];
};

const commentValidation = () => {

    return [
        body("comment")
            .isString().withMessage("O comentário é obrigatório.")
    ];

};

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
};
