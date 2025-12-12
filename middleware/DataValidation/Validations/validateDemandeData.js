import * as demandeValidator from '../Schemas/demandeSchema.js';

export const validateDemandeCreate = async(req,res,next) =>{
    try {
        const val = await demandeValidator.creationValidator.validate(req.body);
        req.val = {...req.val,...val};

        next();
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateDemandeUpdate = async(req,res,next) =>{
    try {
        const val = await demandeValidator.updateValidator.validate(req.body);
        req.val = {...req.val,...val};

        next();
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateDemandeRead = async(req,res,next) =>{
    try {
        console.log(req.params);
        req.val = await demandeValidator.readValidator.validate(req.params);
        next();
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateDemandeDelete = async(req,res,next) =>{
    try {
        const val = await demandeValidator.deleteValidator.validate(req.params);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: error.messages });
    }
}

export const validateDemandeSearch = async(req,res,next)=>{
    try{
        req.val = await demandeValidator.searchDataValidator.validate(req.query);
        next();
    }catch(error){
        console.log(error);
        res.status(400).json({ errors: error.messages });
    }
}