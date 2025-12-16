import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

const creationSchema = vine.object({
    nom: vine.string(),
    prenom: vine.string(),
    mail: vine.string().email(),
    telephone: vine.string(),
    motDePasse: vine.string().optional(),
});

const idSchema = vine.object({
    utilisateurId:vine.number()
});

const updateShema = vine.object({
    utilisateurId:vine.number().positive(),
    nom: vine.string().optional(),
    prenom: vine.string().optional(),
    mail: vine.string().email().optional(),
    telephone: vine.string().optional(),
    motDePasse: vine.string().optional(),
})

const optionalSchema = vine.object({
    utilisateurId:vine.number().positive().optional(),
    nom: vine.string().optional(),
    prenom: vine.string().optional(),
    mail: vine.string().email().optional(),
    telephone: vine.string().optional(),
    motDePasse: vine.string().optional(),
});


export const 
    creationValidator = vine.compile(creationSchema),
    updateValidator = vine.compile(updateShema),
    readValidator = vine.compile(idSchema),
    deleteValidator = vine.compile(idSchema),
    searchValidator = vine.compile(vine.object({
        ...optionalSchema.getProperties(),
        ...searchParameterSchema.getProperties()
    }))