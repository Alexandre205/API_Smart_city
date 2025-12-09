import { dbPool } from "../database/database.js";
import * as vehiculeModel from "../model/vehicule.js";


const addVehicule = async (req,res)=>{
    try{
        const id = await vehiculeModel.createVehicule(dbPool,req.val);
        res.status(201).json(id);
    }catch(err){
        //faire un truc pour expliciter les erreurs sql
        console.error(err);
        res.sendStatus(500);
    }
}

const getVehicule = async (req,res)=>{
    try{
        const vehicule = await vehiculeModel.readVehicule(dbPool,req.val);
        if(vehicule){
            res.send(vehicule);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const updateVehicule = async (req,res)=>{
    try{
        const clePrimaire = await vehiculeModel.updateVehicule(dbPool,req.val);
        if(clePrimaire){
           res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const deleteVehicule = async (req,res)=>{
    try{
        const nbLigneSupp = await vehiculeModel.deleteVehicule(dbPool,req.val);
        if(nbLigneSupp === 1 ){
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const getFilteredVehicule = async (req,res)=>{
    try{
        const vehicules = await vehiculeModel.getVehiculeFilter(dbPool,req.val);
        res.send(vehicules);
    }catch(err){
        res.status(500).send(err.message);
    }
}
export {addVehicule,getVehicule,updateVehicule,deleteVehicule,getFilteredVehicule};