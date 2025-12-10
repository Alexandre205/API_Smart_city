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
    .returning('vehicule_id');
    return clePrimaire[0];
}

const readVehicule = async (SQLQueryBuilder,{id})=>{
    const data = await SQLQueryBuilder.select('vehicule_id','immatriculation','nb_places_maximum','utilisateur')
    .from('vehicule')
    .where({vehicule_id:id});
    return data[0];
}

const updateVehicule = async (SQLQueryBuilder,{utilisateurId,vehiculeId,immatriculation,nbPlaceMax,authId})=>{
    const dataToUpdate = {};
    if(utilisateurId){
        dataToUpdate.utilisateur = utilisateurId;
    }
    if(nbPlaceMax){
        dataToUpdate.nb_places_maximum = nbPlaceMax;
    }
    if(immatriculation){
        dataToUpdate.immatriculation = immatriculation;
    }
    let query = SQLQueryBuilder('vehicule').where({vehicule_id:vehiculeId});

    if(authId){
        query = query.join('utilisateur','vehicule.utilisateur','=','utilisateur.id');
        query = query.where({id:authId});
    }
    const clePrimaire = await query.update(dataToUpdate).returning('vehicule_id');
    return clePrimaire[0];
}

const deleteVehicule = async (SQLQueryBuilder,{id,authId})=>{
    let query =  SQLQueryBuilder('vehicule')
    .where({vehicule_id:id});
    if(authId){
        query = query.join('utilisateur','vehicule.utilisateur','=','utilisateur.id');
        query = query.where({id:authId});
    }
    const nbLigneSupp = await query.del();
    return nbLigneSupp;
}

const getVehiculeFilter = async (SQLQueryBuilder,{utilisateurId,nbPlaceMax,vehiculeId,immatriculation,offset=0,limit=100,fields='*',withCount = false}) =>{
    let baseQuery = SQLQueryBuilder('vehicule');
    if(vehiculeId){
        baseQuery = baseQuery.where({vehicule_id:vehiculeId});
    }
    if(utilisateurId){
        baseQuery = baseQuery.where({utilisateur:utilisateurId});
    }
    if(nbPlaceMax){
        baseQuery = baseQuery.where({nb_places_maximum:nbPlaceMax});
    }
    if(immatriculation){
        baseQuery = baseQuery.where('immatriculation','ilike',immatriculation+'%');
    }
    const data = await baseQuery.clone().select(extractFields(fields)).offset(offset).limit(limit);
    if(withCount){
        const count = await baseQuery.clone().count('* as total');
        const total = parseInt(count[0].total);
        return {data,total};
    }
    return data;
}


export {createVehicule,readVehicule,updateVehicule,deleteVehicule,getVehiculeFilter};