// @ts-expect-error CommonJS issue
import type { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Log } from '../@types/types';

export async function addLog(db: Client, data: Log) {
    const {
        date,
        content,
        level,
        session,
    } = data;

    await db.queryObject(`INSERT INTO log("content","date","level","session") VALUES ('${content}','${date}','${level}','${session}')`);
}
