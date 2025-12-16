import { readFileSync } from 'node:fs';
import {dbPool} from '../../database/database.js';

const sql = readFileSync('./scripts/SQL/InitSQL.sql', 'utf-8');

try {
    await dbPool.raw(sql);
    console.log('done');
} catch (e) {
    console.error(e);
} finally {
    await dbPool.destroy();
}