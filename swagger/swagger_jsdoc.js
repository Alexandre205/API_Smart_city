import {default as swaggerJSDoc} from "swagger-jsdoc";
import * as fs from "node:fs";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Smart city API",
            version: "1.0.0",
        },
    },
    // Chemin des fichier à analyser
    apis: [
        "./controller/**/*.js",
        "./routes/**/*.js",
        "./middleware/**/*.js"
    ],
};

const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync("./swagger/spec.json", JSON.stringify(swaggerSpec));