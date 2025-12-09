import vine from '@vinejs/vine';

const adminEditionSchema = vine.object({
    id:vine.number(),
    name: vine.string().optional(),
    firstName: vine.string().optional(),
    mail: vine.string().email().optional(),
    phone: vine.string().optional(),
    password: vine.string().optional(),
});
const adminEditionValidator = vine.compile(adminEditionSchema);



export {adminEditionValidator};
