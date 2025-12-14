import * as argon2 from "argon2";
import { extractFields } from "../utils/convertData.js";

export const addUser = async function(queryBuilder,{nom,prenom,mail,telephone,motDePasse}){
    const user = await queryBuilder('utilisateur')
        .insert({nom : nom,prenom : prenom,email : mail,telephone : telephone,mot_de_passe : await argon2.hash(motDePasse,{secret : Buffer.from(process.env.PEPPER)})})
        .returning('id');
    return user[0];
}

export const updateUser = async function(queryBuilder,{utilisateurId,nom,prenom,mail,telephone,motDePasse,authId}) {
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
    let query = queryBuilder('utilisateur').where({id: utilisateurId});
    if(authId){
        query = query.where({id:authId});
    }
    const id = await query.update(dataToUpdate).returning('id');
    return id[0];
}


export const readUser = async function(queryBuilder,{utilisateurId}){
    const user = await queryBuilder('utilisateur').where({id : utilisateurId}).select('*');
    return user[0];
}

export const readUserByMail = async function (queryBuilder, {mail}) {
    const user = await queryBuilder('utilisateur').where({email : mail}).select('*');
    return user[0];
}
export const deleteUser = async function(queryBuilder,{utilisateurId,authId}){
    let query = queryBuilder('utilisateur').where({id : utilisateurId});
    if(authId){
        query = query.where({id:sessionId});
    }
    return await query.del();
}

export const getUserFiltrer = async (SQLQueryBuilder,{utilisateurId,nom,prenom,mail,telephone,offset=0,limit=100,fields='id,nom,prenom,email,telephone,mot_de_passe',withCount=false,authId})=>{
    let arrFields = extractFields(fields);
    if(authId){
        arrFields = arrFields.filter(val=>(val!=='email' && val!=='mot_de_passe'));
    }
    if(arrFields.length === 0){
        throw new Error('La propriété fields est vide');
    }
    let baseQuery = SQLQueryBuilder('utilisateur');
    if(utilisateurId){
        baseQuery = baseQuery.where({id:utilisateurId});
    }
    if(nom){
        baseQuery = baseQuery.where('nom','ilike',nom+'%');
    }
    if(prenom){
        baseQuery = baseQuery.where('prenom','ilike',prenom+'%');
    }
    if(mail){
        baseQuery = baseQuery.where('email','ilike',mail+'%');
    }
    if(telephone){
        baseQuery = baseQuery.where('telephone','ilike',telephone+'%');
    }
    const data = await baseQuery.clone().select(arrFields).offset(offset).limit(limit);
    if(withCount){
        const count = await baseQuery.clone().count('* as total');
        const total = parseInt(count[0].total);
        return {data,total};
    }
    return data;
}