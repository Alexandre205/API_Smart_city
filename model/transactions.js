import {createTrajet} from "./trajet.js";


export const demandToRide = async function(SQLQueryBuilder,{demandID,carID}){
    const trx = await SQLQueryBuilder.transaction();
    try{
        const demande = await trx('demande').where({ demande_id : demandID }).first();

        if(!demande){
            throw new Error("Demande non trouvée");
        }
        const passagerId = demande.demandeur;

        await trx('demande').where({demande_id : demandID}).delete();
        const rideID = await trx('trajet').insert({
            date_depart:demande.date_depart,
            date_arrivee:demande.date_arrivee,
            vehicule:carID,
            addresse_depart:demande.addresse_depart,
            addresse_arrivee:demande.addresse_arrivee,
            coordonnee_depart :  trx.raw(`point(?, ?)`,[
                demande.coordonnee_depart.x,
                demande.coordonnee_depart.y
            ]),
            coordonnee_arrivee: trx.raw(`point(?, ?)`, [
                demande.coordonnee_arrivee.x,
                demande.coordonnee_arrivee.y
            ])
        }).returning('trajet_id');
        await trx('passager').insert({
            trajet : rideID[0].trajet_id,
            utilisateur_id:passagerId
        })

        await trx.commit();

        return rideID[0];

    }catch(e){
        await trx.rollback();
        throw e;
    }
}

export const createRideAndCar = async function(SQLQueryBuilder,{ infos, authId }){
    const trx = await SQLQueryBuilder.transaction();
    try{
        let trajetID;
        let userId;
        if(authId === undefined){
            userId = infos.utilisateurId;
        }else{
            userId = authId;
        }

        const carID = await trx('vehicule').insert({immatriculation:infos.immatriculation, nb_places_maximum:infos.nbPlaceMax,utilisateur:userId}).returning('immatriculation');
        if(carID[0]) {
           trajetID = await trx('trajet').insert({date_depart: infos.dateDepart, date_arrivee: infos.dateArrivee, vehicule: carID[0].immatriculation, addresse_depart: infos.addresseDepart, addresse_arrivee: infos.addresseArrivee, coordonnee_depart: infos.coordonneeDepart, coordonnee_arrivee: infos.coordonneeArrivee}).returning('trajet_id');
        }
        if(trajetID[0]) {
            await trx.commit();

            return trajetID[0];
        }else{
            await trx.rollback();
            throw new Error();
        }

    }catch(e){
        await trx.rollback();
        throw e;
    }
}