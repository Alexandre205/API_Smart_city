import vine from '@vinejs/vine';
import {searchParameterSchema} from './otherSchema.js'

const creationSchema = vine.object({
    trajetId: vine.number().positive(),
    utilisateurId: vine.number().positive()
});


const updateSchema = vine.object({
    passagerId: vine.number().positive(),
    trajetId: vine.number().positive().optional(),
    utilisateurId: vine.number().positive().optional()
});

const idSchema = vine.object({
    id: vine.number().positive(),
});


const optionalSchema = vine.object({
    passagerId: vine.number().positive().optional(),
    trajetId: vine.number().positive().optional(),
    utilisateurId: vine.number().positive().optional(),
});

export const 
    creationValidator = vine.compile(creationSchema),
    updateValidator = vine.compile(updateSchema),
    deleteValidator = vine.compile(idSchema),
    readValidator = vine.compile(idSchema),
    searchValidator = vine.compile(vine.object({
        ...optionalSchema.getProperties(),
        ...searchParameterSchema.getProperties()
    }));