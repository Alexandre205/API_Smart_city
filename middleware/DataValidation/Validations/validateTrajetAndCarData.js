import * as trajetValidator from "../Schemas/trajetSchema.js";
import * as vehiculeValidator from "../Schemas/vehicleSchemas.js";

export const validateTrajetAndCar = async(req,res,next) =>{
    try {
        const val1 = await trajetValidator.creationValidator.validate(req.body);
        const val2 = await vehiculeValidator.creationValidator.validate(req.body);
        req.val = {...val1,...val2};
        next();
    }catch(error){
        next(error);
    }
}