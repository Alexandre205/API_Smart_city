import {extractXAndY,extractFields} from '../utils/convertData.js';

const createTrajet = async(SQLQueryBuilder,{dateDepart,dateArrivee,vehicule,addresseArrivee,addresseDepart,coordonneeArrivee,coordonneeDepart})=>{
    const id = await SQLQueryBuilder('trajet').insert({
        date_depart:dateDepart,
        date_arrivee:dateArrivee,
        vehicule:vehicule,
        addresse_depart:addresseDepart,
        addresse_arrivee:addresseArrivee,
        coordonnee_depart:coordonneeDepart,
        coordonnee_arrivee:coordonneeArrivee
    }).returning('trajet_id');
    return id[0];
}

const readTrajet = async (SQLQueryBuilder,{id})=>{
    const data = await SQLQueryBuilder.select('trajet_id','date_depart','date_arrivee','vehicule','addresse_depart','addresse_arrivee','coordonnee_arrivee','coordonnee_depart')
    .from('trajet')
    .where({trajet_id:id});
    return data[0];
}

const updateTrajet = async (SQLQueryBuilder,{trajetId,dateDepart,dateArrivee,vehivuleId,addresseArrivee,addresseDepart,coordonneeArrivee,coordonneeDepart})=>{
    const dataToUpdate = {};
    if(dateDepart){
        dataToUpdate.date_depart = dateDepart;
    }
    if(dateArrivee){
        dataToUpdate.date_arrivee = dateArrivee;
    }
    if(vehivuleId){
        dataToUpdate.vehicule = vehivuleId;
    }
    if(addresseDepart){
        dataToUpdate.addresse_depart = addresseDepart;
    }
    if(addresseArrivee){
        dataToUpdate.addresse_arrivee = addresseArrivee;
    }
    if(coordonneeArrivee){
        dataToUpdate.coordonnee_arrivee = coordonneeArrivee;
    }
    if(coordonneeDepart){
        dataToUpdate.coordonnee_depart = coordonneeDepart;
    }
    const id = await SQLQueryBuilder('trajet').where({trajet_id:trajetId})
    .update(dataToUpdate).returning('trajet_id');
    return id[0];
}

const deleteTrajet = async (SQLQueryBuilder,{id})=>{
    const nbLigneSupp = await SQLQueryBuilder('trajet')
    .where({trajet_id:id})
    .del();
    return nbLigneSupp;
}

const getTrajetFiltrer = async (SQLQueryBuilder,{trajetId,vehicule,dateDepart,dateArrivee,coordonneeDepart,coordonneeArrivee,addresseDepart,addresseArrivee,offset=0,limit=100,fields='*'})=>{
    let query = SQLQueryBuilder.select(extractFields(fields))
    .from('trajet')
    .offset(offset)
    .limit(limit);
    if(trajetId){
        query = query.where({trajet_id:trajetId});
    }
    
    if(vehicule){
        query = query.where('vehicule','ilike',vehicule+'%');
    }
    if(addresseArrivee){
        query = query.where('addresse_arrivee','ilike',addresseArrivee+'%');
    }
    if(addresseDepart){
        query = query.where('addresse_depart','ilike',addresseDepart+'%');
    }
    if(coordonneeDepart){
        const {x,y} = extractXAndY(coordonneeDepart);
        query = query.orderByRaw('POINT(?,?) <-> coordonnee_depart',[x,y]);
    }
    if(coordonneeArrivee){
        const {x,y} = extractXAndY(coordonneeArrivee);
        query = query.orderByRaw(`POINT(?,?) <-> coordonnee_arrivee`,[x,y]);
    }
    if(dateDepart){
        query = query.orderByRaw('ABS(EXTRACT(EPOCH FROM date_depart - ?))',[dateDepart]);
    }
    if(dateArrivee){
        query = query.orderByRaw('ABS(EXTRACT(EPOCH FROM date_arrivee - ?))',[dateArrivee]);
    }
    return await query;
}

export {createTrajet,readTrajet,updateTrajet,deleteTrajet,getTrajetFiltrer};