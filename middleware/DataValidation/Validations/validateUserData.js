import * as userValidator from '../Schemas/userSchemas.js'

export const validateUserCreation = async(req,res,next) =>{
    try {
        req.val = await userValidator.creationValidator.validate(req.body);
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateUserUpdate = async(req,res,next) =>{
    try {
        const val = await userValidator.updateValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateUserRead= async(req,res,next) =>{
    try {
        req.val = await userValidator.readValidator.validate(req.params);
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateUserDelete= async(req,res,next) =>{
    try {
        const val = await userValidator.deleteValidator.validate(req.params);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateUserLogin= async(req,res,next) =>{
    try {
        req.val = await userValidator.loginValidator.validate(req.body);
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateUserSearch = async(req,res,next)=>{
    try{
        const val = await userValidator.searchValidator.validate(req.query);
        req.val = {...req.val,...val};
        console.log(req.val);
        next();
    }catch(err){
        console.error(err);
        res.status(400).json({errors:err.messages});
    }
}