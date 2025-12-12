import { extractFields } from "../utils/convertData.js";

const createPassager = async(SQLQueryBuilder,{trajetId,utilisateurId,authId})=>{
    if(authId && authId !== utilisateurId){
        throw new Error("Id fournit non valide");
    }
    const id = await SQLQueryBuilder('passager').insert({trajet:trajetId,utilisateur_id:utilisateurId}).returning('passager_id');
    return id[0];
}


const readPassager = async(SQLQueryBuilder,{id})=>{
    const passager = await SQLQueryBuilder.select('trajet','utilisateur_id')
    .from('passager')
    .where({passager_id:id});
    return passager[0];
}

const updatePassager = async(SQLQueryBuilder,{passagerId,trajetId,utilisateurId,authId})=>{

    const dataToUpdate = {};
    if(trajetId){
        dataToUpdate.trajet = trajetId;
    }
    if(utilisateurId){
        dataToUpdate.utilisateur_id = utilisateurId;
    }
    let query = SQLQueryBuilder('passager').where({passager_id:passagerId});
    if(authId){
        query = query.where({utilisateurId:authId});
    }
    const clePrimaire = await query.update(dataToUpdate).returning('passager_id');
    return clePrimaire[0];
}

const deletePassager = async(SQLQueryBuilder,{id,authId})=>{
    let query = SQLQueryBuilder('passager').where({passager_id:id});
    if(authId){
        query = query.where({passager_id:authId});
    }
    const nbLigneSupp = await query.del();
    return nbLigneSupp;
}

const getPassagerFiltrer = async (SQLQueryBuilder,{passagerId,trajetId,utilisateurId,offset=0,limit=100,fields='*',withCount=false})=>{
    let baseQuery = SQLQueryBuilder('passager');
    if(passagerId){
        baseQuery = baseQuery.where({passager_id:passagerId});
    }
    if(trajetId){
        baseQuery = baseQuery.where({trajet:trajetId});
    }
    if(utilisateurId){
        baseQuery = baseQuery.where({utilisateur_id:utilisateurId});
    }
    const data = await baseQuery.clone().select(extractFields(fields)).offset(offset).limit(limit);
    if(withCount){
        const count = await baseQuery.clone().count('* as total');
        const total = parseInt(count[0].total);
        return {data,total};
    }
    return data;
}

export {createPassager,readPassager,updatePassager,deletePassager,getPassagerFiltrer};