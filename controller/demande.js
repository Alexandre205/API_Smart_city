import { dbPool } from "../database/database.js";
import * as demandeModel from '../model/demande.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Demande:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant de la demande
 *           example: 1
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant de l'utilisateur
 *           example: 42
 *         addresseDepart:
 *           type: string
 *           description: Adresse de départ
 *           example: "Rue de Bruxelles 1, 1000 Bruxelles"
 *         addresseArrivee:
 *           type: string
 *           description: Adresse d'arrivée
 *           example: "Avenue Louise 50, 1050 Bruxelles"
 *         coordonneeDepart:
 *           type: string
 *           description: Coordonnées GPS du départ (optionnel)
 *           example: "50.8503,4.3517"
 *         coordonneeArrivee:
 *           type: string
 *           description: Coordonnées GPS de l'arrivée (optionnel)
 *           example: "50.8467,4.3525"
 *         dateDepart:
 *           type: string
 *           format: date-time
 *           description: Date et heure de départ
 *           example: "2025-12-20T14:00:00Z"
 *         dateArrivee:
 *           type: string
 *           format: date-time
 *           description: Date et heure d'arrivée
 *           example: "2025-12-20T15:30:00Z"
 */

/**
 * @swagger
 * components:
 *   responses:
 *     addDemande:
 *       description: Ajoute une demande et retourne son identifiant
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Demande'
 */
const addDemande = async(req,res)=>{
    try{
        const id = await demandeModel.createDemande(dbPool,req.val);
        res.status(201).json(id);
    }catch(err){
        console.error(err);
        res.sendStatus(500).json(err);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     getDemande:
 *       description: Récupère la demande correspondant à l'identifiant fourni
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Demande'
 */
const getDemande = async(req,res)=>{
    try{
        const demande = await demandeModel.readDemande(dbPool,req.val);
        if(demande){
            res.send(demande);
        }else{
            console.error("demande introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     updateDemande:
 *       description: Met à jour la demande donnée
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Demande'
 */
const updateDemande = async(req,res)=>{
    try{
        const id = await demandeModel.updateDemande(dbPool,req.val);
        if(id){
            res.sendStatus(204);
        }else{
            console.error("demande introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     deleteDemande:
 *       description: Supprime la demande donnée
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               demandeId:
 *                 type: integer
 */
const deleteDemande = async(req,res)=>{
    try{
        const nbLigneSupp = await demandeModel.deleteDemande(dbPool,req.val);
        if(nbLigneSupp === 1){
            res.sendStatus(204);
        }else{
            console.error("demande introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     searchDemande:
 *       description: Liste des demandes correspondant aux paramètres de recherche
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Demande'
 */
const getDemandeFiltrer = async(req,res)=>{
    try{
        const demandes = await demandeModel.getDemandeFiltrerasync(dbPool,req.query);
        res.send(demandes);
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
}

export {addDemande,getDemande,updateDemande,deleteDemande,getDemandeFiltrer};
