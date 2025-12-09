import * as modelUser from '../model/user.js';
import {dbPool} from '../database/database.js';
import {isAdmin,isValidId} from '../middleware/Authorization/authorization.js'


export const addUser = async function(req,res){
    try{
        const createdUserID = await modelUser.addUser(dbPool,req.val);
        res.status(201).json(createdUserID);
    }catch(error){
        res.sendStatus(500);
    }
}

export const updateUser = async function(req,res){
    try{
        if(isAdmin(req.session.status) || isValidId(req.session.id,req.val.utilisateurId)){
            const updatedUserID = await modelUser.updateUser(dbPool,req.val);
            if(updatedUserID){
                res.sendStatus(204);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(403);
        }
        
    }catch(error){
        res.sendStatus(500);
    }
}

export const getUser = async function(req,res){
    try{
        if(isAdmin(req.session.status) || isValidId(req.session.id,req.val.utilisateurId)){
            const user = await modelUser.readUser(dbPool,req.val);
            if(user){
                res.status(200).json(user);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(403);
        }
    }catch(error){
        res.sendStatus(500);
    }
}
export const readUserByEmail = async function(req,res){
    try{
        if(isAdmin(req.session.status)){
            const user = await modelUser.readUserByMail(dbPool,req.val);
        }
        res.status(200).json(user);
    }catch(error){
        res.sendStatus(500);
    }
}

export const deleteUser = async function(req,res){
    try{
        if(isAdmin(req.session.status) || isValidId(req.session.id,req.val.utilisateurId)){
            await modelUser.deleteUser(dbPool,req.val);
            res.sendStatus(204);
        }else{
            res.sendStatus(403);
        }
    }catch(error){
        res.sendStatus(500);
    }
}



export const getUserFiltrer = async(req,res)=>{
    try{
        let utilisateurs;
        if(isAdmin(req.session)){
            utilisateurs = await modelUser.getUserFiltrer(dbPool,req.val);
        }else{
            if(req.val.fields){
                if(req.val.fields.includes('mot_de_passe') || req.val.fields.includes('email')){
                    res.sendStatus(403);
                }else{
                    utilisateurs = await modelUser.getUserFiltrer(dbPool,req.val);
                }
            }else{
                utilisateurs = await modelUser.getUserFiltrer(dbPool,{...req.val,fields:'id,nom,prenom,telephone'});
            }
        }
        res.send(utilisateurs);
    }catch(err){
        res.status(500).send(err.message);
    }
}