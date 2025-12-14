import * as modelUser from '../model/user.js';
import {dbPool} from '../database/database.js';


export const addUser = async function(req,res){
    try{
        const createdUserID = await modelUser.addUser(dbPool,req.val);
        res.status(201).json(createdUserID);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

export const updateUser = async function(req,res){
    try{
        const updatedUserID = await modelUser.updateUser(dbPool,req.val);
        if(updatedUserID){
            res.sendStatus(204);
        }else{
            console.error("utilisateur introuvable");
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

export const getUser = async function(req,res){
    try{
        const user = await modelUser.readUser(dbPool,req.val);
        if(user){
            res.status(200).json(user);
        }else{
            console.error("utilisateur introuvable");
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}
export const readUserByEmail = async function(req,res){
    try{
        const user = await modelUser.readUserByMail(dbPool,req.val)
        if(user){
            res.status(200).json(user);
        }else{
            console.error("utilisateur introuvable");
            res.sendStatus(404);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

export const deleteUser = async function(req,res){
    try{
        await modelUser.deleteUser(dbPool,req.val);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}



export const getUserFiltrer = async(req,res)=>{
    try{
        const utilisateurs = await modelUser.getUserFiltrer(dbPool,req.val);
        res.send(utilisateurs);
    }catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
}