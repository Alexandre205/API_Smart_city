import express, { Router } from 'express';
import routerUtilisateur from './utilisateur.js';
import routerVehicule from './vehicule.js';
import routerTrajet from './trajet.js';
import routerDemande from './demande.js';
import routerPassager from './passager.js';
import routerConnexion from './connexion.js';
import routerTransaction from './transactions.js'
import routerAvatar from "./avatar.js";
const router = Router();

router.use(express.static('./upload'));

router.use("/trajet",routerTrajet);
router.use("/demande",routerDemande);
router.use("/passager",routerPassager);
router.use('/utilisateur',routerUtilisateur);
router.use('/vehicule',routerVehicule);
router.use("/connexion",routerConnexion);
router.use('/avatar',routerAvatar);
router.use('/transaction',routerTransaction);





export { router };
