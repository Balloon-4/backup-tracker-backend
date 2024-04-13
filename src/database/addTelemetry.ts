// @ts-expect-error CommonJS issue
import type { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Telemetry } from '../@types/types';

export async function addTelemetry(db: Client, data: Telemetry) {
    const {
        accuracy,
        altitude,
        batteryPercent,
        cellStrength,
        date,
        latitude,
        longitude,
        provider,
        session,
        speed,
        temperature,
    } = data;

    await db.queryObject(`INSERT INTO telemetry("accuracy","altitude","batteryPercent","cellStrength","date","latitude","longitude","provider","session","speed","temperature") VALUES (${accuracy},${altitude},${batteryPercent},${cellStrength},'${date}',${latitude},${longitude},'${provider}','${session}',${speed},${temperature})`);
}