import { Router } from "express";
import * as validation from "../../middleware/DataValidation/Validations/validateUserData.js";
import * as utilisateurController from "../../controller/user.js";
import { checkJWT } from "../../middleware/Identification/JWT.js";
import { userAuthentification } from "../../middleware/Authorization/authorization.js";
const routerUtilisateur = Router();


routerUtilisateur.get('/:utilisateurId',checkJWT,validation.validateUserRead,utilisateurController.getUser);
routerUtilisateur.post('/',validation.validateUserCreation,utilisateurController.addUser);
routerUtilisateur.patch('/',checkJWT,userAuthentification,validation.validateUserUpdate,utilisateurController.updateUser);
routerUtilisateur.delete('/:utilisateurId',checkJWT,userAuthentification,validation.validateUserDelete,utilisateurController.deleteUser);

routerUtilisateur.get('/',checkJWT,userAuthentification,validation.validateUserSearch,utilisateurController.getUserFiltrer);
export default routerUtilisateur;