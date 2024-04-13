import type { Router } from 'cloudworker-router';
// @ts-expect-error
import { Schema } from '@cfworker/json-schema';
import { type Env, Log, Route } from '../@types/types';
import { executeSQL } from '../database/executeSQL';
import { getClient } from '../database/getClient';
import { JSONBodyValidateMidware } from '../midware/JSONBodyValidateMidware';
import { addLog } from '../database/addLog';

// https://github.com/cloudflare/worker-template-postgres
// https://github.com/bubblydoo/cloudflare-workers-postgres-client/tree/main
// https://github.com/cloudflare/worker-template-postgres/blob/master/scripts/postgres/docker-compose.yml

export const schema: Schema = {
    $id: '#/definitions/Log',
    $schema: 'http://json-schema.org/draft-07/schema#',
    properties: {
        content: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
        level: {
            type: 'string',
        },
        session: {
            type: 'string',
        },
    },
    required: [
        'content',
        'date',
        'level',
        'session',
    ],
    type: 'object',
};

const midware = [new JSONBodyValidateMidware(schema).generate];

export default (router: Router<Env>) => {
    router.post(Route.LOG, ...midware, async (ctx) => {
        const requestBody = (await ctx.request.json()) as Log;

        const client = await getClient(ctx);
        await executeSQL(client, ctx, async (db) => {
            await addLog(db, requestBody);
        });

        return new Response(null, {
            status: 204,
        });
    });
};