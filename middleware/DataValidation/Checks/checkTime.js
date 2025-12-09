import {dbPool} from "../../../database/database.js";
import {readDemande} from '../../../model/demande.js';
import {readTrajet} from '../../../model/trajet.js'
//  Le code est très similaire entre les deux fonctions(seuls les appels de fonction changent... Faudra peut etre trouver un meilleur moyen de faire
export const checkDatesDemande = async (req, res, next) => { //middleware pour les demandes pour vérifier si les dates sont cohérentes entre elles
    const { dateDepart, dateArrive } = req.val;


    try {
        if (dateDepart && !dateArrive) {
            const {date_arrivee} = await readDemande(dbPool, req.val);
            if (new Date(dateDepart) > new Date(date_arrivee)) {
                return res.sendStatus(400);
            }
        }

        if (dateArrive && !dateDepart) {
            const date_depart = await readDemande(dbPool, req.val);
            if (new Date(dateArrive) < new Date(date_depart)) {
                return res.sendStatus(400);
            }
        }

        if (dateDepart && dateArrive && new Date(dateDepart) > new Date(dateArrive)) {
            return res.sendStatus(400);
        }

        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
};

export const checkDatesTrajet = async (req, res, next) => { //middleware pour les trajet pour vérifier si les dates sont cohérentes entre elles
    const { dateDepart, dateArrive } = req.val;


    try {
        if (dateDepart && !dateArrive) {
            const {date_arrivee} = await readTrajet(dbPool, req.val);
            if (new Date(dateDepart) > new Date(date_arrivee)) {
                return res.sendStatus(400);
            }
        }

        if (dateArrive && !dateDepart) {
            const date_depart = await readDemande(dbPool, req.val);
            if (new Date(dateArrive) < new Date(date_depart)) {
                return res.sendStatus(400);
            }
        }

        if (dateDepart && dateArrive && new Date(dateDepart) > new Date(dateArrive)) {
            return res.sendStatus(400);
        }

        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
};
