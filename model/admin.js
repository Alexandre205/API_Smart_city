import {readUser,addUser,updateUser,deleteUser} from "./user.js";

export const readAdminByMail = async function(queryBuilder,{mail}){
    const admin =  await queryBuilder('admin').where({email : mail}).select('*');
    return admin[0];
}