import { readFileSync } from 'node:fs';
import {db} from '../../database.js';

const sql = readFileSync('./database/scripts/SQL/covoiturage.sql', 'utf-8');

try {
    await db.raw(sql);
    console.log('done');
} catch (e) {
    console.error(e);
} finally {
    await db.destroy();
}
