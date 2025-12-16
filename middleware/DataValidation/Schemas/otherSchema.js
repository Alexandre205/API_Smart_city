import vine from "@vinejs/vine";

/**
 * @swagger
 * components:
 *   schemas:
 *     Search_params:
 *       type: object
 *       properties:
 *         offset:
 *           type: integer
 *           minimum: 0
 *           description: Nombre de résultats à ignorer (pagination)
 *           example: 0
 *         limit:
 *           type: integer
 *           minimum: 0
 *           description: Nombre maximum de résultats à retourner
 *           example: 10
 *         fields:
 *           type: string
 *           description: Liste des champs à retourner, séparés par des virgules
 *           example: "id,name,email"
 *         withCount:
 *           type: boolean
 *           description: Indique si le total des résultats doit être retourné
 *           example: true
 */


export const searchParameterSchema = vine.object({
    offset: vine.number().min(0).optional(),
    limit: vine.number().min(0).optional(),
    fields:vine.string().optional(),
    withCount:vine.boolean().optional()

});