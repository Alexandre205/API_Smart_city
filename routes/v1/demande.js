import { Router } from "express";
import * as demandeController from '../../controller/demande.js'
import * as validation from '../../middleware/DataValidation/Validations/validateDemandeData.js'
import { checkJWT } from "../../middleware/Identification/JWT.js";
import { userAuthentification } from '../../middleware/Authorization/authorization.js'

const routerDemande = Router();

routerDemande.get('/:id',checkJWT,validation.validateDemandeRead,demandeController.getDemande);
routerDemande.post('/',checkJWT,userAuthentification,validation.validateDemandeCreate,demandeController.addDemande);
routerDemande.patch('/',checkJWT,userAuthentification,validation.validateDemandeUpdate,demandeController.updateDemande);
routerDemande.delete('/:id',checkJWT,userAuthentification,validation.validateDemandeDelete,demandeController.deleteDemande);

routerDemande.get('/',checkJWT,validation.validateDemandeSearch,demandeController.getDemandeFiltrer);


export default routerDemande;