import { Router } from "express";
import * as trajetController from '../../controller/trajet.js'
import * as validation from '../../middleware/DataValidation/Validations/validateTrajetData.js'
import {userAuthentification} from '../../middleware/Authorization/authorization.js';
import { checkJWT } from "../../middleware/Identification/JWT.js";

const routerTrajet = Router();

routerTrajet.get('/:id',checkJWT,validation.validateTrajetRead,trajetController.getTrajet);
routerTrajet.post('/',checkJWT,userAuthentification,validation.validateTrajetCreate,trajetController.addTrajet);
routerTrajet.patch('/',checkJWT,userAuthentification,validation.validateTrajetUpdate,trajetController.updateTrajet);
routerTrajet.delete('/:id',checkJWT,userAuthentification,validation.validateTrajetDelete,trajetController.deleteTrajet);

routerTrajet.get('/',checkJWT,validation.validateTrajetSearch,trajetController.getTrajetFiltrer);

export default routerTrajet;