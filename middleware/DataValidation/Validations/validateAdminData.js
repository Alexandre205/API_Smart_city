import * as userValidation from "./validateUserData.js"
import {adminEditionValidator} from '../Schemas/adminSchemas.js'

export const validateLoginAdminData = async(req,res,next) =>{ //Peut être pas utile, à voir
    return userValidation.validateUserLogin(req,res,next);
}

export const validateUserCreation = async(req,res,next) =>{
    return userValidation.validateUserCreation(req,res,next);
}

export const validateUserEdition = async(req,res,next) =>{
    try {
        req.val = await adminEditionValidator.validate(req.body);
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

// export const validateIDFromUser = async(req,res,next) =>{
//     return validateIDUserData(req,res,next);
// }