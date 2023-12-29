import type { Context, Router } from 'cloudworker-router';
// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { type Env, Route } from '../@types/types';

interface IRequestBody {
    altitude: number;
    accuracy: number;
    batteryPercent: number;
    cellStrength: number;
    date: string;
    latitude: number;
    longitude: number;
    provider: string;
    session: string;
    speed: number;
    temperature: number;
}

// https://github.com/cloudflare/worker-template-postgres
// https://github.com/bubblydoo/cloudflare-workers-postgres-client/tree/main
// https://github.com/cloudflare/worker-template-postgres/blob/master/scripts/postgres/docker-compose.yml

export default (router: Router<Env>) => {
    router.post(Route.DATA, async (ctx) => {
        const requestBody = (await ctx.request.json()) as IRequestBody;

        console.log(requestBody);

        const {
            altitude,
            accuracy,
            batteryPercent,
            cellStrength,
            date,
            latitude,
            longitude,
            provider,
            session,
            speed,
            temperature,
        } = requestBody;

        const client = await getClient(ctx);

        // unideal but deal with it
        await client.queryObject(`INSERT INTO telemetry("accuracy","altitude","batteryPercent","cellStrength","date","latitude","longitude","provider","session","speed","temperature") VALUES (${altitude},${accuracy},${batteryPercent},${cellStrength},'${date}',${latitude},${longitude},'${provider}','${session}',${speed},${temperature})`);

        ctx.event.waitUntil(client.end());

        // await ctx.env.DB.prepare('INSERT INTO telemetry VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(
        //     altitude,
        //     accuracy,
        //     batteryPercent,
        //     cellStrength,
        //     date,
        //     latitude,
        //     longitude,
        //     provider,
        //     session,
        //     speed,
        //     temperature,
        // ).run();

        return new Response(null, {
            status: 204,
        });
    });

    // router.get(Route.DATA, async (ctx) => {
    //     const client = await getClient(ctx);
    //     const result = await client.queryObject('SElECT * from telemetry ORDER BY date ASC');
    //     ctx.event.waitUntil(client.end());

    //     return new Response(JSON.stringify(result.rows));
    // });
};

async function getClient(ctx: Context<Env>) {
    // https://github.com/cloudflare/worker-template-postgres/blob/master/src/index.ts
    // @ts-expect-error
    globalThis.CF_CLIENT_ID = ctx.env.CF_CLIENT_ID || undefined;
    // @ts-expect-error
    globalThis.CF_CLIENT_SECRET = ctx.env.CF_CLIENT_SECRET || undefined;

    const client = new Client({
        user: 'balloon_4',
        database: 'postgres',
        hostname: ctx.env.TUNNEL_HOST,
        password: ctx.env.DATABASE_PASSWORD,
        port: '5432',
    });

    await client.connect();

    return client;
}