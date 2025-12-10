import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

const creationSchema = vine.object({
    immatriculation: vine.string(),
    nbPlaceMax: vine.number().positive(),
    utilisateurId: vine.number()
});

const updateSchema = vine.object({
    vehiculeId:vine.number(),
    immatriculation: vine.string().optional(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional()
});

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