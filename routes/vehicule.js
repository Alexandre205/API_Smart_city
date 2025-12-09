import { Router } from "express";
import * as vehiculeController from '../controller/vehicule.js';
import * as validation from '../middleware/DataValidation/Validations/validateVehicleData.js'
import { checkJWT } from "../middleware/Identification/JWT.js";
const routerVehicule = Router();

routerVehicule.get('/:immatriculation',checkJWT,validation.validateVehiculeRead,vehiculeController.getVehicule);
routerVehicule.post('/',checkJWT,validation.validateVehiculeCreate,vehiculeController.addVehicule);
routerVehicule.patch('/',checkJWT,validation.validateVehicleUpdate,vehiculeController.updateVehicule);
routerVehicule.delete('/:immatriculation',checkJWT,validation.validateVehiculeDelete,vehiculeController.deleteVehicule);

routerVehicule.get('/',checkJWT,validation.validateVehiculeSearch,vehiculeController.getFilteredVehicule);

export default routerVehicule;