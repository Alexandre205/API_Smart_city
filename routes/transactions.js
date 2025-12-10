import { Router } from "express";
import * as transactionController from "../controller/transactions.js"
import {checkJWT} from "../middleware/Identification/JWT.js";

import {validateTrajetAndCar} from "../middleware/DataValidation/Validations/validateTrajetAndCarData.js";

const routerTransaction = Router();


routerTransaction.post('/demandToRide',checkJWT,transactionController.demandeToRide);
routerTransaction.post('/createRideAndVehicle',checkJWT,userAuthentification,validateTrajetAndCar,transactionController.addRideAndCar);

export default routerTransaction;