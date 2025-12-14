import {dbPool} from "../database/database.js";
import {readUserByID as readUserAdmin,createUser} from "../model/admin.js";
import * as modelUser from '../model/user.js';
ansactions



export const registerUser = async function(req,res){
    try{
        const createdUserID = await createUser(dbPool,req.val);
        res.status(201).json(createdUserID);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}
export const readUserByID = async function(req,res){
    try{
        const user = await readUserAdmin(dbPool,req.val);
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

export const updateUser = async function(req,res){
    try{
        const updatedUserID = await modelUser.updateUser(dbPool,req.val);

        res.status(204).json(updatedUserID);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

export const deleteUser = async function(req,res){
    try{
        const updatedUserID = await modelUser.deleteUser(dbPool,req.val);
        if(updatedUserID){
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}




