import { dbPool } from "../database/database.js";
import * as vehiculeModel from "../model/vehicule.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      Vehicule:
 *          type: object
 *          properties:
 *              immatriculation:
 *                  type: string
 *              nbPlace:
 *                  type: integer
 *              utilisateurId:
 *                  type: integer
 */

/**
 * @swagger
 * components:
 *  responses:
 *      addVehicule:
 *          description: add the given vehicule and return his identifiant
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Immatriculation'
 */
const addVehicule = async (req,res)=>{
    try{
        const id = await vehiculeModel.createVehicule(dbPool,req.val);
        res.status(201).json(id);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      getVehicule:
 *          description: get the given vehicule
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          immatriculation:
 *                              type: string
 */
const getVehicule = async (req,res)=>{
    try{
        const vehicule = await vehiculeModel.readVehicule(dbPool,req.val);
        if(vehicule){
            res.send(vehicule);
        }else{
            console.error("véhicule introuvable");
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
 *     updateVehicule:
 *       description: update the given vehicule
 */
const updateVehicule = async (req,res)=>{
    try{
        const clePrimaire = await vehiculeModel.updateVehicule(dbPool,req.val);
        if(clePrimaire){
           res.sendStatus(204);
        }else{
            console.error("véhicule introuvable");
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
 *  responses:
 *      deleteVehicule:
 *          description: delete the given vehicule
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          immatriculation:
 *                              type: string
 */
const deleteVehicule = async (req,res)=>{
    try{
        const nbLigneSupp = await vehiculeModel.deleteVehicule(dbPool,req.val);
        if(nbLigneSupp === 1 ){
            res.sendStatus(204);
        }else{
            console.error("véhicule introuvable");
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
 *  responses:
 *      searchVehicule:
 *          description: search vehicules with the given params
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Vehicule'
 */
const getFilteredVehicule = async (req,res)=>{
    try{
        const vehicules = await vehiculeModel.getVehiculeFilter(dbPool,req.val);
        res.send(vehicules);
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
}
export {addVehicule,getVehicule,updateVehicule,deleteVehicule,getFilteredVehicule};