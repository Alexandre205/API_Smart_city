import { Router } from "express";
import * as vehiculeController from '../../controller/vehicule.js';
import * as validation from '../../middleware/DataValidation/Validations/validateVehicleData.js';
import {userAuthentification} from '../../middleware/Authorization/authorization.js';
import { checkJWT } from "../../middleware/Identification/JWT.js";
const routerVehicule = Router();

routerVehicule.get('/:id',checkJWT,userAuthentification,validation.validateVehiculeRead,vehiculeController.getVehicule);
routerVehicule.post('/',checkJWT,userAuthentification,validation.validateVehiculeCreate,vehiculeController.addVehicule);
routerVehicule.patch('/',checkJWT,userAuthentification,validation.validateVehicleUpdate,vehiculeController.updateVehicule);
routerVehicule.delete('/:id',checkJWT,userAuthentification,validation.validateVehiculeDelete,vehiculeController.deleteVehicule);

routerVehicule.get('/',checkJWT,validation.validateVehiculeSearch,vehiculeController.getFilteredVehicule);

export default routerVehicule;