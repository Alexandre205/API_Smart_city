import express, { Router } from 'express';
import {router as v1Router} from './v1/index.js';

const router = Router();

router.use("/v1",v1Router);

router.use((req, res) => {
    console.error(`Bad URL: ${req.path}`);
    return res.status(404).send("There is no path");
});
export default router;