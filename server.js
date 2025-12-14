import express, {request, response} from "express";
import {default as Router} from "./routes/versionIndex.js";
import cors from 'cors';
import pkg from 'pg';
import cookieParser from 'cookie-parser';



//Initialise le parser de postgre node-js le forcant à retourné un string à la place d'une date
//plus d'info https://github.com/brianc/node-pg-types/blob/master/lib/textParsers.js
pkg.types.setTypeParser(1114, (val) => val);



const app = express();
const port = 3001; //peut-etre mettre en .env

//Le serveur autorise le cross-origin resource sharing de toutes les sources
//plus d'info https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

app.use(express.json());


app.use(Router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});