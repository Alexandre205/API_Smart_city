import jwt from "jsonwebtoken";
import redis from "redis";
import { redisClient } from "../../scripts/JS/redis.js";

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *     UnauthorizedError:
 *        description: JWT is missing or invalid
 */
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
        }catch(error){
            console.error(error);
            return res.status(401).send({message : "Le token JWT ne corresponds pas"});
        }
    }else{
        return res.status(401).send({message : "Pas de token JWT"});
    }

};
