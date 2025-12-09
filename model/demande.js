import {extractXAndY,extractFields} from '../utils/convertData.js'

const createDemande = async(SQLQueryBuilder,{utilisateurId,addresseDepart,addresseArrivee,coordonneeDepart,coordonneeArrivee,dateDepart,dateArrivee})=>{
    const id = await SQLQueryBuilder('demande').insert({
        demandeur:utilisateurId,
        addresse_depart:addresseDepart,
        addresse_arrivee:addresseArrivee,
        coordonnee_depart:coordonneeDepart,
        coordonnee_arrivee:coordonneeArrivee,
        date_depart:dateDepart,
        date_arrivee:dateArrivee
    }).returning('demande_id');
    return id[0];
}

const readDemande = async(SQLQueryBuilder,{id})=>{
    const demande = await SQLQueryBuilder.select('demande_id','demandeur','addresse_depart','addresse_arrivee','coordonnee_depart','coordonnee_arrivee','date_depart','date_arrivee')
    .from('demande')
    .where({demande_id:id});
    return demande[0];
}

const updateDemande = async (SQLQueryBuilder,{demandeId,utilisateurId,addresseDepart,addresseArrivee,coordonneeDepart,coordonneeArrivee,dateDepart,dateArrive})=>{
    const dataToUpdate = {};
    if(utilisateurId){
        dataToUpdate.demandeur = utilisateurId;
    }
    if(addresseDepart){
        dataToUpdate.addresse_depart = addresseDepart;
    }
    if(addresseArrivee){
        dataToUpdate.addresse_arrivee = addresseArrivee;
    }
    if(dateDepart){
        dataToUpdate.date_depart = dateDepart;
    }
    if(coordonneeArrivee){

        dataToUpdate.coordonnee_arrivee = coordonneeArrivee;
    }
    if(coordonneeDepart){
        dataToUpdate.coordonnee_depart = coordonneeDepart;
    }
    if(dateArrive){
        dataToUpdate.date_arrive = dateArrive;
    }
    const id = await SQLQueryBuilder('demande').where({demande_id:demandeId})
    .update(dataToUpdate).returning('demande_id');
    return id[0];
}

const deleteDemande = async (SQLQueryBuilder,{id})=>{
    const nbLigneSupp = await SQLQueryBuilder('demande')
    .where({demande_id:id})
    .del();
    return nbLigneSupp;
}

const getDemandeFiltrerasync = async (SQLQueryBuilder,{demandeId,utilisateurId,dateDepart,dateArrivee,coordonneeDepart,coordonneeArrivee,addresseDepart,addresseArrivee,offset=0,limit=100,fields='*'})=>{
    let query = SQLQueryBuilder.select(extractFields(fields))
    .from('demande')
    .offset(offset)
    .limit(limit);
    if(demandeId){
        query = query.where({demande_id:demandeId});
    }
    if(utilisateurId){
        query = query.where({demandeur:utilisateurId});
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
        query = query.orderByRaw('POINT(?,?) <-> coordonnee_arrivee',[x,y]);
    }
    if(dateDepart){
        query = query.orderByRaw('ABS(EXTRACT(EPOCH FROM date_depart - ?))',[dateDepart]);
    }
    if(dateArrivee){
        query = query.orderByRaw('ABS(EXTRACT(EPOCH FROM date_arrivee - ?))',[dateArrivee]);
    }
    return await query;
}

export {createDemande,readDemande,updateDemande,deleteDemande,getDemandeFiltrerasync};