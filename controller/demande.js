import { dbPool } from "../database/database.js";
import * as demandeModel from '../model/demande.js';

const addDemande = async(req,res)=>{
    try{
        const id = await demandeModel.createDemande(dbPool,req.val);
        res.status(201).json(id);
    }catch(err){
        //expliciter erreur sql
        console.error(err);
        res.sendStatus(500);
    }
}

const getDemande = async(req,res)=>{
    try{
        const demande = await demandeModel.readDemande(dbPool,req.val);
        if(demande){
            res.send(demande);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const updateDemande = async(req,res)=>{
    try{
        const id = await demandeModel.updateDemande(dbPool,req.val);
        if(id){
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const deleteDemande = async(req,res)=>{
    try{
        const nbLigneSupp = await demandeModel.deleteDemande(dbPool,req.val);
        if(nbLigneSupp === 1){
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const getDemandeFiltrer = async(req,res)=>{
    try{
        const demandes = await demandeModel.getDemandeFiltrerasync(dbPool,req.query);
        res.send(demandes);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export {addDemande,getDemande,updateDemande,deleteDemande,getDemandeFiltrer};