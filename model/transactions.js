
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
            coordonnee_depart:demande.coordonnee_depart,
            coordonnee_arrivee:demande.coordonnee_arrivee
        }).returning('trajet_id');

        await trx('passager').insert({
            trajet : rideID[0],
            utilisateur_id:passagerId
        })

        await trx.commit();

        return rideID[0];

    }catch(e){
        await trx.rollback();
        throw e;
    }
}