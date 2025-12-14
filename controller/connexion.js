import { dbPool } from "../database/database.js";
import {identifyLogin} from "../model/person.js";
import jwt from "jsonwebtoken";
import * as uuid from 'uuid';
import {redisClient} from "../scripts/JS/redis.js";

export const login = async (req,res) => {
    try{
        const person = await identifyLogin(dbPool,req.val);

        let expiringTime;

        if(person.id && person.status){
            if(person.status === 'utilisateur' || person.status === 'admin'){
                expiringTime = "10m";
            }else{
                res.status(404).send({message : "Login invalide"});
            }

            const accessToken = jwt.sign({ id: person.id, status: person.status, jti: uuid.v4() }, process.env.JWT_TOKEN, { expiresIn: expiringTime });

            const refreshToken = jwt.sign({ id: person.id, status: person.status, jti: uuid.v4() }, process.env.JWT_TOKEN, { expiresIn: "1d" });

            const platform = req.headers['platform-type'];

            if(platform === "mobile"){
                res.status(201).send({accessToken,refreshToken})
            }else {
                res.cookie("refresh_token", refreshToken, {path: "/" ,secure: false, httpOnly:true,sameSite: "lax",maxAge: 24 * 60 * 60 * 1000});
                res.status(201).send(accessToken);
            }
        }else{
            res.status(404).json({error:"Pas de compte lié à ces identifiant"});
        }
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
}

export const logout = async (req,res) => {
    let decodedToken;
    const platform = req.headers['platform-type'];
    try {
        const token = platform === "mobile" ? req.headers['authorization']?.split(' ')[1] : req.cookies["refresh_token"];

        if (!token){
            res.status(401).json({ message: "Pas de token fourni" });
        }

        decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
        console.error("Token invalide :", err.message);
        res.status(401).json({ message: "Token invalide ou expiré" });
    }

    const tokenId = decodedToken.jti;
    await redisClient.setEx(tokenId, 3600 * 24, 'blacklisted');

    if(platform !== "mobile") {
        res.cookie("refresh_token", "", { path: "/" ,secure: false,httpOnly:true, sameSite: "lax", expires: new Date(0) });
    }
    res.status(200).json({ message: "Logout effectué" });
}

export const refresh = async (req, res) => {
    const platform = req.headers['platform-type'];
    const refreshToken = platform === "mobile" ? req.body.refreshToken : req.cookies["refresh_token"];

    if (!refreshToken) {
        res.status(406).json({ message: 'pas de refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN);

        const isBlacklisted = await redisClient.get(decoded.jti);
        if (isBlacklisted) {
            res.status(400).json({ message: 'Token is blacklisted' });
        }

        const accessToken = jwt.sign(
            {
                id: decoded.id,
                status: decoded.status,
                jti: uuid.v4()
            },
            process.env.JWT_TOKEN,
            { expiresIn: '10m' }
        );
        res.status(201).send(accessToken);

    } catch (err) {
        console.error(err);
       res.status(406).json({ message: 'refresh token invalide' });
    }
};


