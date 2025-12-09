import vine from "@vinejs/vine";

const loginSchema = vine.object({
    mail: vine.string().email(),
    motDePasse: vine.string(),
});

export const 
    loginValidator = vine.compile(loginSchema);