import {dbPool} from "../database/database.js";
import {readUserByID as readUserAdmin,createUser,editUser,cancelUser} from "../model/admin.js";
import {identifyLogin} from "../model/person.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";



export const registerUser = async function(req,res){
    try{
        const createdUserID = await createUser(dbPool,req.val);
        res.status(201).json(createdUserID);
    }catch(error){
        console.log(error);
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

export const changeUserInfo = async function(req,res){
    try{
        const updatedUserID = await editUser(dbPool,req.val);
        res.status(204).json(updatedUserID);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export const removeUser = async function(req,res){
    try{
        await deleteUser(dbPool,req.val)
        res.sendStatus(204)
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}




