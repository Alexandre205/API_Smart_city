import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

const creationSchema = vine.object({
    immatriculation: vine.string(),
    nbPlaceMax: vine.number().positive(),
    utilisateurId: vine.number()
});

const updateSchema = vine.object({
    immatriculation: vine.string(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional()
});

const immatriculationSchema = vine.object({
    immatriculation: vine.string(),
});

const optionalSchema = vine.object({
    immatriculation: vine.string().optional(),
    nbPlaceMax: vine.number().positive().optional(),
    utilisateurId: vine.number().optional(),
});

export const
    creationValidator = vine.compile(creationSchema),
    updateValidator = vine.compile(updateSchema),
    readValidator = vine.compile(immatriculationSchema),
    deleteValidator = vine.compile(immatriculationSchema),
    searchValidator = vine.compile(vine.object({
        ...optionalSchema.getProperties(),
        ...searchParameterSchema.getProperties()
    }));