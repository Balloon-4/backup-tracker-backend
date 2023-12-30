// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Context } from 'cloudworker-router';
import { Env } from '../@types/types';

// unsightly
export async function executeSQL(client: Client, ctx: Context<Env>, func: (db: Client) => Promise<void>) {
    await client.connect();
    await func(client);
    ctx.event.waitUntil(client.end());
}