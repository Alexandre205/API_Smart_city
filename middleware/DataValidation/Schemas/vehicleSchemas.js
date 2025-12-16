import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     VehiculeToAdd:
 *       type: object
 *       properties:
 *         immatriculation: 
 *           type: string
 *           description: Numéro d'immatriculation du véhicule
 *           example: "1-ABC-123"
 *         nbPlaceMax:
 *           type: integer
 *           description: Nombre maximum de places dans le véhicule
 *           example: 5
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant de l'utilisateur propriétaire
 *           example: 42
 *       required:
 *         - immatriculation
 *         - nbPlaceMax
 *         - utilisateurId
 */
const creationSchema = vine.object({
    immatriculation: vine.string(),
    nbPlaceMax: vine.number().positive(),
    utilisateurId: vine.number()
});

/**
 * @swagger
 * components:
 *   schemas:
 *     VehiculeToUpdate:
 *       type: object
 *       properties:
 *         vehiculeId:
 *           type: integer
 *           description: Identifiant du véhicule à mettre à jour
 *           example: 1
 *         immatriculation: 
 *           type: string
 *           description: Numéro d'immatriculation
 *           example: "1-ABC-123"
 *         nbPlaceMax:
 *           type: integer
 *           description: Nombre maximum de places
 *           example: 5
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant de l'utilisateur propriétaire
 *           example: 42
 *       required:
 *         - vehiculeId
 */
const updateSchema = vine.object({
    vehiculeId: vine.number(),
    immatriculation: vine.string().optional(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional()
});

/**
 * @swagger
 * components:
 *   schemas:
 *     VehiculeId:
 *       type: object
 *       properties:
 *         id: 
 *           type: integer
 *           description: Identifiant du véhicule
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
 *     VehiculeOptional:
 *       type: object
 *       properties:
 *         vehicule_id:
 *           type: integer
 *           description: Identifiant du véhicule
 *           example: 1
 *         immatriculation:
 *           type: string
 *           description: Immatriculation
 *           example: "1-ABC-123"
 *         nbPlaceMax:
 *           type: integer
 *           description: Nombre maximum de places
 *           example: 5
 *         utilisateurId:
 *           type: integer
 *           description: Identifiant du propriétaire
 *           example: 42
 *       additionalProperties: false
 */
const optionalSchema = vine.object({
    vehicule_id: vine.number().optional(),
    immatriculation: vine.string().optional(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional(),
});


/**
 * @swagger
 * components:
 *   schemas:
 *     VehiculeSearch:
 *       allOf:
 *         - $ref: '#/components/schemas/VehiculeOptional'
 *         - $ref: '#/components/schemas/Search_params'
 */
export const
    creationValidator = vine.compile(creationSchema),
    updateValidator = vine.compile(updateSchema),
    readValidator = vine.compile(idSchema),
    deleteValidator = vine.compile(idSchema),
    searchValidator = vine.compile(vine.object({
        ...optionalSchema.getProperties(),
        ...searchParameterSchema.getProperties()
    }));
