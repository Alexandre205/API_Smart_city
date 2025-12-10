import {dbPool} from "../database/database.js";
import {demandToRide,deleteRide} from "../model/transactions.js";

export const demandeToRide = async(req,res) =>{
    try {
        const id = await demandToRide(dbPool, req.body);
        return res.status(201).send(id);
    }catch(e){
        console.error(e);

        if (e.message === "404") {
            return res.status(404).json("Ressource introuvable");
        }else{
            return res.status(500).json({ error: "Erreur serveur lors de la transaction" });
        }
        //jsp comment gérer les erreurs de transactions => soit mauvais demande, soit erreur serveur
    }
}

export const cancelRide = async(req,res) =>{
    try {
        await deleteRide(dbPool, {rideID: req.params.rideID, authId: req.val.authId, status: req.session.status});
        return res.sendStatus(204);
    }catch(e){
        console.error(e);

        if(e.message === "401"){
            return res.status(404).json("Action non autorisée");
        }else if (e.message === "404") {
            return res.status(404).json("Ressource introuvable");
        }else{
            return res.status(500).json({ error: "Erreur serveur lors de la transaction" });
        }
    }
}