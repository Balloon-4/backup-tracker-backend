// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Telemetry } from '../@types/types';

export async function addTelemetry(db: Client, data: Telemetry) {
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
    } = data;

    await db.queryObject(`INSERT INTO telemetry("accuracy","altitude","batteryPercent","cellStrength","date","latitude","longitude","provider","session","speed","temperature") VALUES (${altitude},${accuracy},${batteryPercent},${cellStrength},'${date}',${latitude},${longitude},'${provider}','${session}',${speed},${temperature})`);
}