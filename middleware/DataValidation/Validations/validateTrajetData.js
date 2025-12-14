import * as trajetValidator from '../Schemas/trajetSchema.js';


export const validateTrajetCreate = async(req,res,next) =>{
    try {

        const val = await trajetValidator.creationValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateTrajetUpdate = async(req,res,next) =>{
    try {
        const val = await trajetValidator.updateValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateTrajetRead = async(req,res,next) =>{
    try {
        req.val = await trajetValidator.readValidator.validate(req.params);
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateTrajetDelete = async(req,res,next) =>{
    try {
        const val = await trajetValidator.deleteValidator.validate(req.params);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateTrajetSearch = async(req,res,next)=>{
    try {
        req.val = await trajetValidator.searchValidator.validate(req.query);
        next();
    }catch(error){
        console.error(error);
        res.status(400).json({ errors: error.messages });
    }
}