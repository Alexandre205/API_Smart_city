import * as passagerValidator from '../Schemas/passagerSchemas.js';

export const validatePassagerCreate = async(req,res,next) =>{
    try {
        const val = await passagerValidator.creationValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validatePassagerUpdate = async(req,res,next) =>{
    try {
        const val = await passagerValidator.updateValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validatePassagerRead = async(req,res,next) =>{
    try {
        req.val = await passagerValidator.readValidator.validate(req.params);
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validatePassagerDelete = async(req,res,next) =>{
    try {
        const val = await passagerValidator.deleteValidator.validate(req.params);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validatePassagerSearch = async(req,res,next)=>{
    try{
        req.val = await passagerValidator.searchValidator.validate(req.query);
        next();
    }catch(err){
        res.status(400).json({ errors: error.messages });
    }
}