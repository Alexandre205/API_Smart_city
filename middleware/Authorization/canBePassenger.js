import {dbPool} from "../../database/database.js";
import {getTrajetFiltrer} from "../../model/trajet.js";
import {getVehiculeFilter} from "../../model/vehicule.js";
import {getPassagerFiltrer} from "../../model/passager.js";

export const canBePassenger = async function (req, res, next) {

    try {
        const car = await getTrajetFiltrer(dbPool, {...req.val, fields: "vehicule"});
        if(car.length === 0){
            return res.status(404).send("Problème lors de la recherche du trajet")
        }

        const carPlaces = await getVehiculeFilter(dbPool, {immatriculation:car[0].vehicule, fields:"nb_places_maximum"});
        if(carPlaces.length === 0){
            return res.status(404).send("Problème lors de la recherche du véhicule associé au trajet");
        }

        const passagers = await getPassagerFiltrer(dbPool,{trajetId:req.val.trajetId});
        if (!Array.isArray(passagers)) {
            return res.status(500).send("Problème lors de la recherche des passagers associés au trajet");
        }

        if(passagers.length < carPlaces[0].nb_places_maximum){
            next();
        }else{
            return res.status(409).send("Plus aucune place dans le véhicule")
        }

    }catch(e){
        return res.send(e);
    }
};