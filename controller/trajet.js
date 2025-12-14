import { dbPool } from "../database/database.js";
import * as trajetModel from '../model/trajet.js';


const addTrajet = async(req,res)=>{
    try{
        const id = await trajetModel.createTrajet(dbPool,req.val);
        res.status(201).json(id);
    }catch(err){
        console.error(err);
        res.status(500).json(err);
    }
}

const getTrajet = async(req,res)=>{
    try{
        const trajet = await trajetModel.readTrajet(dbPool,req.val);
        if(trajet){
            res.send(trajet);
        }else{
            console.error("trajet introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const updateTrajet = async(req,res)=>{
    try{
        const id = await trajetModel.updateTrajet(dbPool,req.val);
        if(id){
            res.sendStatus(204);
        }else{
            console.error("trajet introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const deleteTrajet = async(req,res)=>{
    try{
        const nbLigneSupp = await trajetModel.deleteTrajet(dbPool,req.val);
        if(nbLigneSupp === 1){
            res.sendStatus(204);
        }else{
            console.error("trajet introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const getTrajetFiltrer = async(req,res)=>{
    try{
        const trajets = await trajetModel.getTrajetFiltrer(dbPool,req.val);
        res.send(trajets);
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
}

export {addTrajet,getTrajet,updateTrajet,deleteTrajet,getTrajetFiltrer};