// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Context } from 'cloudworker-router';
import { Env } from '../@types/types';

// unsightly
export function getClient(ctx: Context<Env>) {
    // https://github.com/cloudflare/worker-template-postgres/blob/master/src/index.ts
    // @ts-expect-error
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