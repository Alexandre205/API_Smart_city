import vine from '@vinejs/vine';
import { searchParameterSchema } from './otherSchema.js';

const creationSchema = vine.object({
    addresseDepart: vine.string(),
    addresseArrivee: vine.string(),
    coordonneeDepart: vine.string().coordinates().optional(),
    coordonneeArrivee:vine.string().coordinates().optional(),
    dateDepart: vine.date().after('today',{compare:'minutes'}),
    dateArrivee: vine.date().afterField('dateDepart',{compare:'minutes'}),
    vehicule: vine.string()
});

const updateSchema = vine.object({
    trajetId: vine.number(),
    addresseDepart: vine.string().optional(),
    addresseArrivee: vine.string().optional(),
    coordonneeDepart:vine.string().coordinates().optional(),
    coordonneeArrivee:vine.string().coordinates().optional(),
    dateDepart: vine.date().after('today',{compare:'minutes'}).optional(),
    dateArrivee: vine.date().after('today',{compare:'minutes'}).optional(),
    vehicule: vine.string().optional()
});

const idSchema = vine.object({
    id: vine.number(),
});


const optionalSchema = vine.object({
    trajetId: vine.number().optional(),
    addresseDepart: vine.string().optional(),
    addresseArrivee: vine.string().optional(),
    coordonneeDepart:vine.string().coordinates().optional(),
    coordonneeArrivee:vine.string().coordinates().optional(),
    dateDepart: vine.date().optional(),
    dateArrivee: vine.date().optional(),
    vehicule: vine.string().optional()
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