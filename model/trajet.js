import {extractXAndY,extractFields} from '../utils/convertData.js';
import {readVehicule} from '../model/vehicule.js';


const createTrajet = async(SQLQueryBuilder,{dateDepart,dateArrivee,vehicule,addresseArrivee,addresseDepart,coordonneeArrivee,coordonneeDepart,authId})=>{
    if(authId){
        const vehic = await readVehicule(SQLQueryBuilder,{immatriculation:vehicule});
        if(vehic?.utilisateur !== authId){
            throw new Error("Immatriculation non valide");
        }
    }
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


const updateTrajet = async (SQLQueryBuilder,{trajetId,dateDepart,dateArrivee,vehivuleId,addresseArrivee,addresseDepart,coordonneeArrivee,coordonneeDepart,authId})=>{
    if(authId){
        const vehic = await readVehicule(SQLQueryBuilder,{immatriculation:vehicule});
        if(vehic?.utilisateur !== authId){
            throw new Error("Immatriculation non valide");
        }
    }

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
    let query = SQLQueryBuilder('trajet').where({trajet_id:trajetId});
    const id = await query.update(dataToUpdate).returning('trajet_id');
    return id[0];
}

const deleteTrajet = async (SQLQueryBuilder,{id,authId})=>{
    let query = SQLQueryBuilder('trajet')
    .where({trajet_id:id});
    if(authId){
        query = query.join('vehicule','trajet.vehicule','=','vehicule.immatriculation');
        query = query.join('utilisateur','vehicule.utilisateur','=','utilisateur.id');
        query = query.where({id:authId});
    }
    const nbLigneSupp = await query.del();
    return nbLigneSupp;
}

const getTrajetFiltrer = async (SQLQueryBuilder,{trajetId,vehicule,dateDepart,dateArrivee,coordonneeDepart,coordonneeArrivee,addresseDepart,addresseArrivee,offset=0,limit=100,fields='*',withCount=false})=>{
    let baseQuery = SQLQueryBuilder('trajet');
    if(trajetId){
        baseQuery = baseQuery.where({trajet_id:trajetId});
    }
    if(vehicule){
        baseQuery = baseQuery.where('vehicule','ilike',vehicule+'%');
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

export {createTrajet,readTrajet,updateTrajet,deleteTrajet,getTrajetFiltrer};