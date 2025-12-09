import { Router } from "express";
import {validateUserCreation,validateUserEdition} from "../middleware/DataValidation/Validations/validateAdminData.js";
import {registerUser,changeUserInfo} from "../controller/admin.js"
import {checkJWT} from "../middleware/Identification/JWT.js"
import {isAdmin} from "../middleware/Authorization/isAdmin.js"
const routerAdmin = Router();


routerAdmin.post('/create',checkJWT,isAdmin,validateUserCreation,registerUser)
routerAdmin.patch('/edit',checkJWT,isAdmin,validateUserEdition,changeUserInfo);

export default routerAdmin;