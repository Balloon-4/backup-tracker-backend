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

    it('should add telemetry to the database in the correct format', () => {
        const telemetry = {
            accuracy: 0,
            altitude: 0,
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

        const queryObject = vi.fn((query: string) => mockPostgres.public.query(query));

        const mockClient = {
            queryObject: queryObject,
        };

        addTelemetry(mockClient as unknown as Client, telemetry);
        const data = mockPostgres.public.one('SELECT * FROM telemetry LIMIT 1');
        expect(JSON.stringify(data)).toEqual(JSON.stringify(telemetry));
    });
});