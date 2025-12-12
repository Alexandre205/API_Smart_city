import { Router } from "express";
import * as connexionController from "../../controller/connexion.js"
import * as validation from "../../middleware/DataValidation/Validations/validateConnexionData.js";


const routerConnexion = Router();


routerConnexion.post('/login',validation.validateLogin,connexionController.login);
routerConnexion.post('/refresh',connexionController.refresh);
routerConnexion.post('/logout', connexionController.logout);

export default routerConnexion;