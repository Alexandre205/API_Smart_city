import express, {Router} from "express";
import {checkJWT} from "../middleware/Identification/JWT.js";
import * as validation from "../middleware/DataValidation/Validations/validateImage.js";
import routerUtilisateur from "./utilisateur.js";
import multer from "multer";
import {avatarValidation} from "../controller/avatarManager.js";

const routerAvatar = Router();

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
         fileSize: 5 * 1024 * 1024
    },
    storage: storage
})



routerAvatar.patch('/',checkJWT,upload.single('avatar'),avatarValidation);

export default routerAvatar;