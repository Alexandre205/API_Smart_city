import {extractXAndY,extractFields} from '../utils/convertData.js'

const createDemande = async(SQLQueryBuilder,{utilisateurId,addresseDepart,addresseArrivee,coordonneeDepart,coordonneeArrivee,dateDepart,dateArrivee,authId})=>{
    if(authId && authId !== utilisateurId){
        throw new Error("Id fournit non valide");
    }
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

const updateDemande = async (SQLQueryBuilder,{demandeId,utilisateurId,addresseDepart,addresseArrivee,coordonneeDepart,coordonneeArrivee,dateDepart,dateArrive,authId})=>{
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
    let query = SQLQueryBuilder('demande').where({demande_id:demandeId});
    if(authId){
        query = query.where({utilisateurId:authId});
    }
    const id = await query.update(dataToUpdate).returning('demande_id');
    return id[0];
}

const deleteDemande = async (SQLQueryBuilder,{id,authId})=>{
    let query = SQLQueryBuilder('demande').where({demande_id:id});
    if(authId){
        query = query.where({demandeur:authId});
    }
    const nbLigneSupp = await query.del();
    return nbLigneSupp;
}

const getDemandeFiltrerasync = async (SQLQueryBuilder,{demandeId,utilisateurId,dateDepart,dateArrivee,coordonneeDepart,coordonneeArrivee,addresseDepart,addresseArrivee,offset=0,limit=100,fields='*',withCount=false})=>{
    let baseQuery = SQLQueryBuilder('demande');
    if(demandeId){
        baseQuery = baseQuery.where({demande_id:demandeId});
    }
    if(utilisateurId){
        baseQuery = baseQuery.where({demandeur:utilisateurId});
    }
    if(addresseArrivee){
        baseQuery = baseQuery.where('addresse_arrivee','ilike',addresseArrivee+'%');
    }
    if(addresseDepart){
        baseQuery = baseQuery.where('addresse_depart','ilike',addresseDepart+'%');
    }
    let dataQuery = baseQuery.clone(); //Sinon le order by bloque car il attent un group by
    if(coordonneeDepart){
        const {x,y} = extractXAndY(coordonneeDepart);
        dataQuery = dataQuery.orderByRaw('POINT(?,?) <-> coordonnee_depart',[x,y]);
    }
    if(coordonneeArrivee){
        const {x,y} = extractXAndY(coordonneeArrivee);
        dataQuery = dataQuery.orderByRaw('POINT(?,?) <-> coordonnee_arrivee',[x,y]);
    }
    if(dateDepart){
        dataQuery = dataQuery.orderByRaw('ABS(EXTRACT(EPOCH FROM date_depart - ?))',[dateDepart]);
    }
    if(dateArrivee){
        dataQuery = dataQuery.orderByRaw('ABS(EXTRACT(EPOCH FROM date_arrivee - ?))',[dateArrivee]);
    }
    const data = await dataQuery.clone().select(extractFields(fields)).offset(offset).limit(limit);
    if(withCount){
        const count = await baseQuery.clone().count('* as total');
        const total = parseInt(count[0].total);
        return {data,total};
    }
    return data;
}

export {createDemande,readDemande,updateDemande,deleteDemande,getDemandeFiltrerasync};