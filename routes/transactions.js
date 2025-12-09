import { Router } from "express";
import * as transactionController from "../controller/transactions.js"

const routerTransaction = Router();


routerTransaction.post('/demandToRide',transactionController.demandeToRide);

export default routerTransaction;