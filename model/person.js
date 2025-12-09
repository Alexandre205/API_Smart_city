import {readUserByMail} from "./user.js";
import * as argon2 from "argon2";
import {readAdminByMail} from "./admin.js";

export const identifyLogin = async (SQLQueryBuilder,{mail,motDePasse})=>{
    const [user,admin] = await Promise.all([
        readUserByMail(SQLQueryBuilder,{mail}),
        readAdminByMail(SQLQueryBuilder,{mail})
    ]);
    const typeConnexion = user || admin;
    if(!typeConnexion){
        return {id:null,status:null};
    }
    let status = user ? 'utilisateur':'admin';
    const motDePasseBon = await argon2.verify(typeConnexion.mot_de_passe.trim(), motDePasse, {secret: Buffer.from(process.env.PEPPER)});
    return motDePasseBon ? {id:typeConnexion.id,status:status} : {id:null,status:null};
}