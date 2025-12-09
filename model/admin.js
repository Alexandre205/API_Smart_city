import {readUser,addUser,updateUser,deleteUser} from "./user.js";

export const readAdminByMail = async function(queryBuilder,{mail}){
    const admin =  await queryBuilder('admin').where({email : mail}).select('*');
    return admin[0];
}

export const readUserByID = async function(queryBuilder,data) {
    return await readUser(queryBuilder,data);
}

export const createUser = async function(queryBuilder, data){
    return await addUser(queryBuilder,data);
}

export const editUser = async function(queryBuilder, data){
    return await updateUser(queryBuilder,data.id,data);
}

export const cancelUser = async function(queryBuilder, data){
    return await deleteUser(queryBuilder,data);
}