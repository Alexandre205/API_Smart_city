import  * as vehiculeValidator from '../Schemas/vehicleSchemas.js'

export const validateVehiculeCreate = async(req,res,next) =>{
    try {
        const val = await vehiculeValidator.creationValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validateVehicleUpdate = async(req,res,next) =>{
    try {
        const val = await vehiculeValidator.updateValidator.validate(req.body);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validateVehiculeRead = async(req,res,next) =>{
    try {
        req.val = await vehiculeValidator.readValidator.validate(req.params);
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validateVehiculeDelete = async(req,res,next) =>{
    try {
        const val = await vehiculeValidator.deleteValidator.validate(req.params);
        req.val = {...req.val,...val};
        next();
    }catch(error){
        res.status(400).json({ errors: error.messages });
    }
}

export const validateVehiculeSearch = async(req,res,next)=>{
    try{
        req.val = await vehiculeValidator.searchValidator.validate(req.query);
        next();
    }catch(err){
        res.status(400).json({ errors: err.messages });
    }
}