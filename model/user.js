import * as argon2 from "argon2";
import { extractFields } from "../utils/convertData.js";
import {avatarValidation} from "../controller/avatarManager.js";
import upload from "pg/lib/result";

export const addUser = async function(queryBuilder,{nom,prenom,mail,telephone,motDePasse}){
    const user = await queryBuilder('utilisateur')
                .insert({nom : nom,prenom : prenom,email : mail,telephone : telephone,mot_de_passe : await argon2.hash(motDePasse,{secret : Buffer.from(process.env.PEPPER)})})
                .returning('id');
    return user[0];
}

export const updateUser = async function(queryBuilder,{utilisateurId,nom,prenom,mail,telephone,motDePasse}) {
    const dataToUpdate = {};
    if (nom) {
        dataToUpdate.nom = nom;
    }
    if (prenom) {
        dataToUpdate.prenom = prenom;
    }
    if (mail) {
        dataToUpdate.email = mail;
    }
    if (telephone) {
        dataToUpdate.telephone = telephone;
    }
    if (motDePasse) {
        dataToUpdate.mot_de_passe = await argon2.hash(motDePasse, {secret: Buffer.from(process.env.PEPPER)});
    }
    const id = await queryBuilder('utilisateur').where({id: utilisateurId}).update(dataToUpdate).returning('id');
    return id[0];
}


export const readUser = async function(queryBuilder,{utilisateurId}){
    const user = await queryBuilder('utilisateur').where({id : utilisateurId}).select('*');
    return user[0];
}

export const readUserByMail = async function (queryBuilder, {mail}) {
    const user= await queryBuilder('utilisateur').where({email : mail}).select('*');
    return user[0]
}
export const deleteUser = async function(queryBuilder,{utilisateurId}){
    await queryBuilder('utilisateur').where({id : utilisateurId}).del();
}

export const getUserFiltrer = async (SQLQueryBuilder,{utilisateurId,nom,prenom,mail,telephone,offset=0,limit=100,fields='*'})=>{
    let query = SQLQueryBuilder.select(extractFields(fields))
    .from('utilisateur')
    .offset(offset)
    .limit(limit);
    if(utilisateurId){
        query = query.where({id:utilisateurId});
    }
    if(nom){
        query = query.where('nom','ilike',nom+'%');
    }
    if(prenom){
        query = query.where('prenom','ilike',prenom+'%');
    }
    if(mail){
        query = query.where('email','ilike',mail+'%');
    }
    if(telephone){
        query = query.where('telephone','ilike',telephone+'%');
    }
    return await query;
}