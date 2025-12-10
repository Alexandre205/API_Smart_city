
export const demandToRide = async function(SQLQueryBuilder,{demandID,carID}){
    const trx = await SQLQueryBuilder.transaction();
    try{
        const demande = await trx('demande').where({ demande_id : demandID }).first();

        if(!demande){
            throw new Error("404");
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

export const deleteRide = async function(SQLQueryBuilder,{ rideID, authId, status }){
    const trx = await SQLQueryBuilder.transaction();
    try{
        const trajet = await trx('trajet').select('trajet_id','vehicule').where({trajet_id : rideID}).first();

        if(!trajet){
            throw new Error("404");
        }else{
            const car = await trx('vehicule').select('utilisateur').where({immatriculation : trajet.vehicule}).first();
            if(!car){
                throw new Error("404");
            }
            if(car.utilisateur !== authId && status !== "admin"){
                throw new Error("401")
            }
        }

        await trx('passager').where({trajet : rideID}).delete();
        await trx('trajet').where({trajet_id : rideID}).delete();

        await trx.commit();

    }catch(e){
        await trx.rollback();
        throw e;
    }
}