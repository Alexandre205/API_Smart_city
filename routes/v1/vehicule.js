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
 *     summary: récupere un vehicule
 *     tags:
 *         - Vehicule
 *     parameters:
 *         - in: path
 *           description : id du vehicule a récupérer
 *           content:
 *                 application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/VehiculeId' 
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
 *      summary: crée un vehicule
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
 *       summary: modifie un vehcule
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
 *     summary: supprime un vehicule
 *     parameters:
 *         - in: path
 *           description : id du vehicule a supprimer
 *           content:
 *                 application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/VehiculeId' 
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



/**
 * @swagger
 * /vehicule:
 *   get:
 *     tags:
 *       - Vehicule
 *     summary: Recherche de véhicules
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           $ref: '#/components/schemas/VehiculeSearch'
 *         description: Paramètres de recherche combinés
 *     responses:
 *       200:
 *         description: Liste des véhicules correspondant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicule'
 */

routerVehicule.get('/',checkJWT,validation.validateVehiculeSearch,vehiculeController.getFilteredVehicule);

export default routerVehicule;