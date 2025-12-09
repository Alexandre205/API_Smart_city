import { readFileSync } from 'node:fs';
import {dbPool} from '../../database/database.js';

const initTable = readFileSync('./scripts/SQL/InitTableSQL.sql', 'utf-8');
const initValues = readFileSync('./scripts/SQL/InitValueSQL.sql', 'utf-8');

try {
    await dbPool.raw(initTable);
    await dbPool.raw(initValues);
    console.log('done');
} catch (e) {
    console.error(e);
} finally {
    await dbPool.destroy();
}