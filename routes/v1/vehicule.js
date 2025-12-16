import { Router } from "express";
import * as vehiculeController from '../../controller/vehicule.js';
import * as validation from '../../middleware/DataValidation/Validations/validateVehicleData.js';
import {userAuthentification} from '../../middleware/Authorization/authorization.js';
import { checkJWT } from "../../middleware/Identification/JWT.js";
const routerVehicule = Router();

/**
 * @swagger
 * /vehicule/{immatriculation}:
 *  get:
 *     security:
 *         - bearerAuth: []
 *     tags:
 *         - Vehicule
 *     parameters:
 *         - in: path
 *           name: immatriculation
 *           schema:
 *             type: string
 *           required: true
 *           description: L'id du vehicule à trouver
 *     responses:
 *         200:
 *             $ref: '#/components/responses/getVehicule'
 *         400:
 *             description: mauvais format
 *         401:
 *             $ref: '#/components/responses/UnauthorizedError'
 *         403:
 *             description: acces non autorisé
 *         404:
 *             description: vehicule non trouvé
 *         500:
 *             description: erreur serveur
 */
routerVehicule.get('/:id',checkJWT,userAuthentification,validation.validateVehiculeRead,vehiculeController.getVehicule);

/**
 * @swagger
 * /vehicule:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Vehicule
 *      requestBody:
 *            description: véhicule à rajouter
 *            required: true
 *            content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/VehiculeToAdd'
 *      responses:
 *          201:
 *             $ref: '#/components/responses/addVehicule'
 *          400:
 *              description: mauvais format
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: acces non autorisé
 *          500:
 *              description: erreur serveur
 */
routerVehicule.post('/',checkJWT,userAuthentification,validation.validateVehiculeCreate,vehiculeController.addVehicule);

/**
 * @swagger
 * /vehicule:
 *  patch:
 *       security:
 *           - bearerAuth : []
 *       tags:
 *          - Vehicule
 *       requestBody:
 *              description: véhicule à modifier
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/VehiculeToUpdate' 
 *       responses:
 *           204:
 *              $ref: '#/components/responses/updateVehicule'
 *           400: 
 *              description: mauvais format
 *           401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *           403:
 *              description: acces non autorisé
 *           404:
 *              description: vehicule non trouvé
 *           500:
 *              description: erreur serveur
 *  
 */
routerVehicule.patch('/',checkJWT,userAuthentification,validation.validateVehicleUpdate,vehiculeController.updateVehicule);

/**
 * @swagger
 * /vehicule/{immatriculation}:
 *  delete:
 *     security:
 *         - bearerAuth: []
 *     tags:
 *         - Vehicule
 *     parameters:
 *         - in: path
 *           name: immatriculation
 *           schema:
 *             type: string
 *           required: true
 *           description: L'id du vehicule à supprimer
 *     responses:
 *         200:
 *           description: Véhicule supprimer
 *         400:
 *             description: mauvais format
 *         401:
 *             $ref: '#/components/responses/UnauthorizedError'
 *         403:
 *             description: acces non autorisé
 *         404:
 *             description: vehicule non trouvé
 *         500:
 *             description: erreur serveur
 */
routerVehicule.delete('/:id',checkJWT,userAuthentification,validation.validateVehiculeDelete,vehiculeController.deleteVehicule);

routerVehicule.get('/',checkJWT,validation.validateVehiculeSearch,vehiculeController.getFilteredVehicule);

export default routerVehicule;