import jwt from "jsonwebtoken";
import redis from "redis";
import { redisClient } from "../../scripts/JS/redis.js";


export const checkJWT = async function (req, res, next){
    const auth = req.get('authorization');
    if(auth !== undefined && auth.includes("Bearer")){
        const token = auth.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

            req.session = {
                id : decodedToken.id,
                status : decodedToken.status,
            }
            
            next();
        }catch{
            return res.sendStatus(401);
        }
    }else{
        return res.sendStatus(401);
    }

};
