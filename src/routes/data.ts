import type { Router } from 'cloudworker-router';
// @ts-expect-error
import { Schema } from '@cfworker/json-schema';
import { type Env, Route, Telemetry } from '../@types/types';
import { addTelemetry } from '../database/addTelemetry';
import { executeSQL } from '../database/executeSQL';
import { getClient } from '../database/getClient';
import { JSONBodyValidateMidware } from '../midware/JSONBodyValidateMidware';

// https://github.com/cloudflare/worker-template-postgres
// https://github.com/bubblydoo/cloudflare-workers-postgres-client/tree/main
// https://github.com/cloudflare/worker-template-postgres/blob/master/scripts/postgres/docker-compose.yml

export const schema: Schema = {
    $id: '#/definitions/Telemetry',
    $schema: 'http://json-schema.org/draft-07/schema#',
    properties: {
        accuracy: {
            type: 'number',
        },
        altitude: {
            type: 'number',
        },
        batteryPercent: {
            type: 'number',
        },
        cellStrength: {
            type: 'number',
        },
        date: {
            type: 'string',
        },
        latitude: {
            type: 'number',
        },
        longitude: {
            type: 'number',
        },
        provider: {
            type: 'string',
        },
        session: {
            type: 'string',
        },
        speed: {
            type: 'number',
        },
        temperature: {
            type: 'number',
        },
    },
    required: [
        'altitude',
        'accuracy',
        'batteryPercent',
        'cellStrength',
        'date',
        'latitude',
        'longitude',
        'provider',
        'session',
        'speed',
        'temperature',
    ],
    type: 'object',
};

const midware = [new JSONBodyValidateMidware(schema).generate];

export default (router: Router<Env>) => {
    router.post(Route.DATA, ...midware, async (ctx) => {
        const requestBody = (await ctx.request.json()) as Telemetry;

        const client = await getClient(ctx);
        await executeSQL(client, ctx, async (db) => {
            await addTelemetry(db, requestBody);
        });

        return new Response(null, {
            status: 204,
        });
    });
};