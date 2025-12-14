import { Router } from "express";
import * as userValidation from "../../middleware/DataValidation/Validations/validateUserData.js";
import * as userController from '../../controller/user.js';
import * as demandeValidation from '../../middleware/DataValidation/Validations/validateDemandeData.js';
import * as demandeController from '../../controller/demande.js';
import * as passagerValidation from '../../middleware/DataValidation/Validations/validatePassagerData.js';
import * as passagerController from '../../controller/passager.js';
import * as trajetValidation from '../../middleware/DataValidation/Validations/validateTrajetData.js';
import * as trajetController from '../../controller/trajet.js';
import * as vehiculeValidation from '../../middleware/DataValidation/Validations/validateVehicleData.js';
import * as vehiculeController from '../../controller/vehicule.js';

import {checkJWT} from "../../middleware/Identification/JWT.js"
import {isAdmin} from "../../middleware/Authorization/isAdmin.js"
const routerAdmin = Router();

routerAdmin.delete('/utilisateur/:utilisateurId',checkJWT,isAdmin,userValidation.validateUserDelete,userController.deleteUser);
//routerAdmin.post('/utilisateur',checkJWT,isAdmin,userValidation.validateUserCreation,userController.addUser);
routerAdmin.patch('/utilisateur',checkJWT,isAdmin,userValidation.validateUserUpdate,userController.updateUser);

routerAdmin.delete('/demande/:demandeId',checkJWT,isAdmin,demandeValidation.validateDemandeDelete,demandeController.deleteDemande);
routerAdmin.post('/demande',checkJWT,isAdmin,demandeValidation.validateDemandeCreate,demandeController.addDemande);
routerAdmin.patch('/demande',checkJWT,isAdmin,demandeValidation.validateDemandeUpdate,demandeController.updateDemande);

routerAdmin.delete('/passager/:passagerId',checkJWT,isAdmin,passagerValidation.validatePassagerDelete,passagerController.deletePassager);
routerAdmin.post('/passager',checkJWT,isAdmin,passagerValidation.validatePassagerCreate,passagerController.addPassager);
routerAdmin.patch('/passager',checkJWT,isAdmin,passagerValidation.validatePassagerUpdate,passagerController.updatePassager);

routerAdmin.delete('/trajet/:trajetId',checkJWT,isAdmin,trajetValidation.validateTrajetDelete,trajetController.deleteTrajet);
routerAdmin.post('/trajet',checkJWT,isAdmin,trajetValidation.validateTrajetCreate,trajetController.addTrajet);
routerAdmin.patch('/trajet',checkJWT,isAdmin,trajetValidation.validateTrajetUpdate,trajetController.updateTrajet);

routerAdmin.delete('/vehicule/:immatriculation',checkJWT,isAdmin,vehiculeValidation.validateVehiculeDelete,vehiculeController.deleteVehicule);
routerAdmin.post('/vehicule',checkJWT,isAdmin,vehiculeValidation.validateVehiculeCreate,vehiculeController.addVehicule);
routerAdmin.patch('/vehicule',checkJWT,isAdmin,vehiculeValidation.validateVehicleUpdate,vehiculeController.updateVehicule);


export default routerAdmin;