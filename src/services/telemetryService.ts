// @ts-expect-error CommonJS issue
import type { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Telemetry } from '../@types/types';

export async function addTelemetry(db: Client, data: Telemetry) {
    const {
        accuracy,
        altitude,
        batteryPercent,
        cellPower,
        cellStrength,
        cellTower,
        date,
        latitude,
        longitude,
        pressure,
        provider,
        session,
        speed,
        temperature,
        timeToFix,
    } = data;

    await db.queryObject(`INSERT INTO telemetry("accuracy","altitude","batteryPercent","cellPower","cellStrength","cellTower","date","latitude","longitude","pressure","provider","session","speed","temperature","timeToFix") VALUES (${accuracy ?? 'NULL'},${altitude ?? 'NULL'},${batteryPercent ?? 'NULL'},${cellPower ?? 'NULL'},${cellStrength ?? 'NULL'},${cellTower ? `'${cellTower}'` : 'NULL'},'${date}',${latitude ?? 'NULL'},${longitude ?? 'NULL'},${pressure ?? 'NULL'},${provider ? `'${provider}'` : 'NULL'},'${session}',${speed ?? 'NULL'},${temperature ?? 'NULL'},${timeToFix ?? 'NULL'})`);
}
