import {dbPool} from "../database/database.js";
import {demandToRide} from "../model/transactions.js";

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
        //jsp comment gérer les erreurs de transactions => soit mauvais demande, soit erreur serveur
    }
}