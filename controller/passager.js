import { dbPool } from "../database/database.js";
import * as passagerModel from '../model/passager.js'

const addPassager = async(req,res)=>{
    try{
        const id = await passagerModel.createPassager(dbPool,req.val);
        res.status(201).json(id);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const getPassager = async(req,res)=>{
    try{
        const passager = await passagerModel.readPassager(dbPool,req.val);
        if(passager){
            res.send(passager);
        }else{
            console.error("passager introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const updatePassager = async(req,res)=>{
    try{
        const id = await passagerModel.updatePassager(dbPool,req.val);
        if(id){
            res.sendStatus(204);
        }else{
            console.error("passager introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const deletePassager = async(req,res)=>{
    try{
        const nbLigneSupp = await passagerModel.deletePassager(dbPool,req.val)
        if(nbLigneSupp === 1){
            res.sendStatus(204);
        }else{
            console.error("passager introuvable");
            res.sendStatus(404);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

const getPassagerFiltrer = async (req,res)=>{
    try{
        const passagers = await passagerModel.getPassagerFiltrer(dbPool,req.query);
        res.send(passagers);
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
}

export {addPassager,getPassager,updatePassager,deletePassager,getPassagerFiltrer};