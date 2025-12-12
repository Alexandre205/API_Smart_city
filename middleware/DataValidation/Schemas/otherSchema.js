import vine from "@vinejs/vine";

export const searchParameterSchema = vine.object({
    offset: vine.number().min(0).optional(),
    limit: vine.number().min(0).optional(),
    fields:vine.string().optional(),
    withCount:vine.boolean().optional()

});