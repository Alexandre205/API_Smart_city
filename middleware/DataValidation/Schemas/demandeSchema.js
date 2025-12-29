import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     DemandeToAdd:
 *       type: object
 *       properties:
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant de l'utilisateur
 *           example: 42
 *         addresseDepart:
 *           type: string
 *           description: Adresse de départ
 *           example: "Rue de Bruxelles 1, 1000 Bruxelles"
 *         addresseArrivee:
 *           type: string
 *           description: Adresse d'arrivée
 *           example: "Avenue Louise 50, 1050 Bruxelles"
 *         coordonneeDepart:
 *           type: string
 *           description: Coordonnées GPS du départ (optionnel)
 *           example: "50.8503,4.3517"
 *         coordonneeArrivee:
 *           type: string
 *           description: Coordonnées GPS de l'arrivée (optionnel)
 *           example: "50.8467,4.3525"
 *         dateDepart:
 *           type: string
 *           format: date-time
 *           description: Date et heure de départ
 *           example: "2025-12-20T14:00:00Z"
 *         dateArrivee:
 *           type: string
 *           format: date-time
 *           description: Date et heure d'arrivée
 *           example: "2025-12-20T15:30:00Z"
 *       required:
 *         - utilisateurId
 *         - addresseDepart
 *         - addresseArrivee
 *         - dateDepart
 *         - dateArrivee
 */
const creationSchema = vine.object({
    utilisateurId: vine.number(),
    addresseDepart: vine.string(),
    addresseArrivee: vine.string(),
    coordonneeDepart: vine.string().coordinates().optional(), 
    coordonneeArrivee: vine.string().coordinates().optional(), 
    dateDepart: vine.date().after('today',{compare:'minutes'}),
    dateArrivee: vine.date().afterField('dateDepart',{compare:'minutes'})
});

/**
 * @swagger
 * components:
 *   schemas:
 *     DemandeToUpdate:
 *       type: object
 *       properties:
 *         demandeId:
 *           type: integer
 *           description: Identifiant de la demande à mettre à jour
 *           example: 1
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant de l'utilisateur (optionnel)
 *         addresseDepart:
 *           type: string
 *           description: Adresse de départ (optionnel)
 *         addresseArrivee:
 *           type: string
 *           description: Adresse d'arrivée (optionnel)
 *         coordonneeDepart:
 *           type: string
 *           description: Coordonnées GPS du départ (optionnel)
 *         coordonneeArrivee:
 *           type: string
 *           description: Coordonnées GPS de l'arrivée (optionnel)
 *         dateDepart:
 *           type: string
 *           format: date-time
 *           description: Date et heure de départ (optionnel)
 *         dateArrivee:
 *           type: string
 *           format: date-time
 *           description: Date et heure d'arrivée (optionnel)
 *       required:
 *         - demandeId
 */
const updateSchema = vine.object({
    demandeId: vine.number(),
    utilisateurId: vine.number().optional(),
    addresseDepart: vine.string().optional(), 
    addresseArrivee: vine.string().optional(),
    coordonneeDepart: vine.string().coordinates().optional(),
    coordonneeArrivee: vine.string().coordinates().optional(),
    dateDepart: vine.date().after('today',{compare:'minutes'}).optional(),
    dateArrivee: vine.date().after('today',{compare:'minutes'}).optional(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     DemandeId:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant de la demande
 *           example: 1
 *       required:
 *         - id
 */
const idSchema = vine.object({
    id: vine.number(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     DemandeOptional:
 *       type: object
 *       properties:
 *         demandeId:
 *           type: integer
 *           description: Identifiant de la demande (optionnel)
 *           example: 1
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant de l'utilisateur (optionnel)
 *           example: 42
 *         addresseDepart:
 *           type: string
 *           description: Adresse de départ (optionnel)
 *         addresseArrivee:
 *           type: string
 *           description: Adresse d'arrivée (optionnel)
 *         coordonneeDepart:
 *           type: string
 *           description: Coordonnées GPS du départ (optionnel)
 *         coordonneeArrivee:
 *           type: string
 *           description: Coordonnées GPS de l'arrivée (optionnel)
 *         dateDepart:
 *           type: string
 *           format: date-time
 *           description: Date et heure de départ (optionnel)
 *         dateArrivee:
 *           type: string
 *           format: date-time
 *           description: Date et heure d'arrivée (optionnel)
 *       additionalProperties: false
 */
const optionalSchema = vine.object({
    demandeId: vine.number().optional(),
    utilisateurId: vine.number().optional(),
    addresseDepart: vine.string().optional(), 
    addresseArrivee: vine.string().optional(),
    coordonneeDepart: vine.string().coordinates().optional(),
    coordonneeArrivee: vine.string().coordinates().optional(),
    dateDepart: vine.date().optional(),
    dateArrivee: vine.date().optional(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     DemandeSearch:
 *       allOf:
 *         - $ref: '#/components/schemas/DemandeOptional'
 *         - $ref: '#/components/schemas/Search_params'
 */
export const 
    creationValidator = vine.compile(creationSchema),
    updateValidator = vine.compile(updateSchema),
    deleteValidator = vine.compile(idSchema),
    readValidator = vine.compile(idSchema),
    searchDataValidator = vine.compile(vine.object({
        ...optionalSchema.getProperties(),
        ...searchParameterSchema.getProperties()
    }));
