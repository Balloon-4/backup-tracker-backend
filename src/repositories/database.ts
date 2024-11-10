// @ts-expect-error CommonJS issue
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Context } from 'cloudworker-router';
import { Env } from '../@types/types';

export async function executeSQL(client: Client, ctx: Context<Env>, func: (db: Client) => Promise<void>) {
    await client.connect();
    await func(client);
    ctx.event.waitUntil(client.end());
}

// unsightly
export function getClient(ctx: Context<Env>) {
    // https://github.com/cloudflare/worker-template-postgres/blob/master/src/index.ts
    // @ts-expect-error this is necessary for Cloudflare Access with @bubblydoo/cloudflare-workers-postgres-client
    globalThis.CF_CLIENT_ID = ctx.env.CF_CLIENT_ID || undefined;
    // @ts-expect-error
    globalThis.CF_CLIENT_SECRET = ctx.env.CF_CLIENT_SECRET || undefined;

    return new Client({
        user: 'balloon_4',
        database: 'postgres',
        hostname: ctx.env.TUNNEL_HOST,
        password: ctx.env.DATABASE_PASSWORD,
        port: '5432',
    });
}
