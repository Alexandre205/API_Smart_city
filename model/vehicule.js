import { extractFields } from "../utils/convertData.js";

const createVehicule = async (SQLQueryBuilder,{immatriculation,nbPlaceMax,utilisateurId,authId})=>{
    if(authId && authId !== utilisateurId){
        throw new Error("L'id passé est invalide invalide");
    }
    const clePrimaire = await SQLQueryBuilder('vehicule').insert({
        immatriculation:immatriculation,
        nb_places_maximum:nbPlaceMax,
        utilisateur:utilisateurId
    })
    .returning('immatriculation');
    return clePrimaire[0];
}

const readVehicule = async (SQLQueryBuilder,{immatriculation})=>{
    const data = await SQLQueryBuilder.select('immatriculation','nb_places_maximum','utilisateur')
    .from('vehicule')
    .where({immatriculation:immatriculation});
    return data[0];
}

const updateVehicule = async (SQLQueryBuilder,{utilisateurId,immatriculation,nbPlaceMax,authId})=>{
    const dataToUpdate = {};
    if(utilisateurId){
        dataToUpdate.utilisateur = utilisateurId;
    }
    if(nbPlaceMax){
        dataToUpdate.nb_places_maximum = nbPlaceMax;
    }
    query = SQLQueryBuilder('vehicule').where({immatriculation:immatriculation});

    if(authId){
        query = query.join('utilisateur','vehicule.utilisateur','=','utilisateur.id');
        query = query.where({id:authId});
    }
    const clePrimaire = await query.update(dataToUpdate).returning('immatriculation');
    return clePrimaire[0];
}

const deleteVehicule = async (SQLQueryBuilder,{immatriculation,authId})=>{
    let query =  SQLQueryBuilder('vehicule')
    .where({immatriculation:immatriculation});
    if(authId){
        query = query.join('utilisateur','vehicule.utilisateur','=','utilisateur.id');
        query = query.where({id:authId});
    }
    const nbLigneSupp = await query.del();
    return nbLigneSupp;
}

const getVehiculeFilter = async (SQLQueryBuilder,{utilisateurId,nbPlaceMax,immatriculation,offset=0,limit=100,fields='*'}) =>{
    let query = SQLQueryBuilder.select(extractFields(fields))
    .from('vehicule')
    .offset(offset)
    .limit(limit);
    if(utilisateurId){
        query = query.where({utilisateur:utilisateurId});
    }
    if(nbPlaceMax){
        query = query.where({nb_places_maximum:nbPlaceMax});
    }
    if(immatriculation){
        query = query.where('immatriculation','ilike',immatriculation+'%');
    }
    return await query;
}


export {createVehicule,readVehicule,updateVehicule,deleteVehicule,getVehiculeFilter};