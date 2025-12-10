import { Router } from "express";
import * as transactionController from "../controller/transactions.js"
import {checkJWT} from "../middleware/Identification/JWT.js";
import {userAuthentification} from "../middleware/Authorization/authorization.js";

const routerTransaction = Router();


routerTransaction.post('/demandToRide',checkJWT,transactionController.demandeToRide);
routerTransaction.delete('/deleteRide/:rideID',checkJWT,userAuthentification,transactionController.cancelRide);

export default routerTransaction;