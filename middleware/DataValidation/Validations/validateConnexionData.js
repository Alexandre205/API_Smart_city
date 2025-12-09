import * as connexionShema from "../Schemas/connexionSchemas.js"

export const validateLogin = async (req,res,next)=>{
    try{
        req.val = await connexionShema.loginValidator.validate(req.body);
        next();
    }catch(err){
        res.status(400).json({ errors: err.messages });
    }
}