import {
    beforeAll, describe, expect, it, vi,
} from 'vitest';
import { IMemoryDb, newDb } from 'pg-mem';
import fs from 'fs';
// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { addTelemetry } from './addTelemetry';

describe('addTelemetry.ts', () => {
    let mockPostgres: IMemoryDb;

    beforeAll(() => {
        mockPostgres = newDb();
        mockPostgres.public.none(fs.readFileSync('./src/schema/schema.sql', 'utf8'));
    });

    it('should add telemetry to the database', () => {
        const telemetry = {
            altitude: 0,
            accuracy: 0,
            batteryPercent: 0,
            cellStrength: 0,
            date: '2021-07-18T00:00:00.000Z',
            latitude: 0,
            longitude: 0,
            provider: 'test',
            session: 'test',
            speed: 0,
            temperature: 0,
        };

        const queryObject = vi.fn((query: string) => mockPostgres.public.none(query));

        const mockClient = {
            queryObject: queryObject,
        };

        addTelemetry(mockClient as unknown as Client, telemetry);

        expect(queryObject).toHaveBeenCalledWith('INSERT INTO telemetry("accuracy","altitude","batteryPercent","cellStrength","date","latitude","longitude","provider","session","speed","temperature") VALUES (0,0,0,0,\'2021-07-18T00:00:00.000Z\',0,0,\'test\',\'test\',0,0)');
    });
});