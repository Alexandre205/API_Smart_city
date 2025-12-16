import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

/**
 * @swagger
 * components:
 *   schemas:
 *      VehiculeToAdd:
 *          type: object
 *          properties:
 *              immatriculation: 
 *                  type: string
 *              nbPlaceMax:
 *                  type: integer
 *              idUtilisateur:
 *                  type: integer
 *          required:
 *              - immatriculation
 *              - nbPlaceMax
 *              - idUtilisateur
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
 *      VehiculeToUpdate:
 *          type: object
 *          properties:
 *              immatriculation: 
 *                  type: string
 *              nbPlaceMax:
 *                  type: integer
 *              idUtilisateur:
 *                  type: integer
 *          required:
 *              - immatriculation
 */
const updateSchema = vine.object({
    vehiculeId:vine.number(),
    immatriculation: vine.string().optional(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional()
});

/**
 * @swagger
 * components:
 *   schemas:
 *      Immatriculation:
 *          type: object
 *          properties:
 *              immatriculation: 
 *                  type: string
 *          required:
 *              - immatriculation
 */
const idSchema = vine.object({
    id: vine.number(),
});

const optionalSchema = vine.object({
    vehicule_id:vine.number().optional(),
    immatriculation: vine.string().optional(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional(),
});

export const
    creationValidator = vine.compile(creationSchema),
    updateValidator = vine.compile(updateSchema),
    readValidator = vine.compile(idSchema),
    deleteValidator = vine.compile(idSchema),
    searchValidator = vine.compile(vine.object({
        ...optionalSchema.getProperties(),
        ...searchParameterSchema.getProperties()
    }));