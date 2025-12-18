import { Router } from "express";
import * as demandeController from '../../controller/demande.js';
import * as validation from '../../middleware/DataValidation/Validations/validateDemandeData.js';
import { checkJWT } from "../../middleware/Identification/JWT.js";
import { userAuthentification } from '../../middleware/Authorization/authorization.js';

const routerDemande = Router();

/**
 * @swagger
 * /demande/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Récupère une demande
 *     tags:
 *       - Demande
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la demande à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/getDemande'
 *       400:
 *         description: mauvais format
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: accès non autorisé
 *       404:
 *         description: demande non trouvée
 *       500:
 *         description: erreur serveur
 */
routerDemande.get('/:id', checkJWT, validation.validateDemandeRead, demandeController.getDemande);

/**
 * @swagger
 * /demande:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crée une nouvelle demande
 *     tags:
 *       - Demande
 *     requestBody:
 *       description: Données de la demande à ajouter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DemandeToAdd'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/addDemande'
 *       400:
 *         description: mauvais format
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: accès non autorisé
 *       500:
 *         description: erreur serveur
 */
routerDemande.post('/', checkJWT, userAuthentification, validation.validateDemandeCreate, demandeController.addDemande);

/**
 * @swagger
 * /demande:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Modifie une demande existante
 *     tags:
 *       - Demande
 *     requestBody:
 *       description: Données de la demande à modifier
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DemandeToUpdate'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/updateDemande'
 *       400:
 *         description: mauvais format
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: accès non autorisé
 *       404:
 *         description: demande non trouvée
 *       500:
 *         description: erreur serveur
 */
routerDemande.patch('/', checkJWT, userAuthentification, validation.validateDemandeUpdate, demandeController.updateDemande);

/**
 * @swagger
 * /demande/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Supprime une demande
 *     tags:
 *       - Demande
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la demande à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         $ref: '#/components/responses/deleteDemande'
 *       400:
 *         description: mauvais format
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: accès non autorisé
 *       404:
 *         description: demande non trouvée
 *       500:
 *         description: erreur serveur
 */
routerDemande.delete('/:id', checkJWT, userAuthentification, validation.validateDemandeDelete, demandeController.deleteDemande);

/**
 * @swagger
 * /demande:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Recherche des demandes avec des filtres
 *     tags:
 *       - Demande
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           $ref: '#/components/schemas/DemandeSearch'
 *         description: Paramètres de recherche combinés
 *     responses:
 *       200:
 *         description: Liste des demandes correspondant aux critères
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Demande'
 *       400:
 *         description: mauvais format
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: accès non autorisé
 *       404:
 *         description: demande non trouvée
 *       500:
 *         description: erreur serveur
 */
routerDemande.get('/', checkJWT, validation.validateDemandeSearch, demandeController.getDemandeFiltrer);

export default routerDemande;
