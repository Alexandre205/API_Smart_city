import vine from '@vinejs/vine'

const avatarSchema = vine.object({
    mimetype: vine.enum(['image/jpeg', 'image/png'])
})

export const avatarValidator = vine.compile(avatarSchema);
