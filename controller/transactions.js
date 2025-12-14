import {dbPool} from "../database/database.js";
import {demandToRide, createRideAndCar} from "../model/transactions.js";
import {validateVehiculeCreate} from "../middleware/DataValidation/Validations/validateVehicleData.js";
import {validateTrajetCreate} from "../middleware/DataValidation/Validations/validateTrajetData.js";

export const demandeToRide = async(req,res) =>{
    try {
        const id = await demandToRide(dbPool, req.body);

        res.status(201).send(id);
    }catch(e){
        console.error(e);
        if (e.message === "Demande non trouvée") {
            return res.status(404).json(e.message);
        }else{
            return res.status(500).json({ error: "Erreur serveur lors de la transaction" });
        }
    }

}

export const addRideAndCar = async(req,res) =>{
    try {
        console.log(req.val);
        const rideId = await createRideAndCar(dbPool, {infos : req.val,authId: req.val?.authId});
        return res.sendStatus(201).send(rideId);
    }catch(e){
        console.error(e);
        return res.status(500).json(e);
    }
}