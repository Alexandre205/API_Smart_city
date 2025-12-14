import { Router } from "express";
import * as passagerController from '../../controller/passager.js'
import * as validation from '../../middleware/DataValidation/Validations/validatePassagerData.js'
import { checkJWT } from "../../middleware/Identification/JWT.js";
import { userAuthentification } from "../../middleware/Authorization/authorization.js";
import {canBePassenger} from "../../middleware/Authorization/canBePassenger.js";


const routerPassager = Router();

routerPassager.get('/:id',checkJWT,validation.validatePassagerRead,passagerController.getPassager);
routerPassager.post('/',checkJWT,userAuthentification,validation.validatePassagerCreate,canBePassenger,passagerController.addPassager);
routerPassager.patch('/',checkJWT,userAuthentification,validation.validatePassagerUpdate,passagerController.updatePassager);
routerPassager.delete('/:id',checkJWT,userAuthentification,validation.validatePassagerDelete,passagerController.deletePassager);

routerPassager.get('/',checkJWT,validation.validatePassagerSearch,passagerController.getPassagerFiltrer);


export default routerPassager;