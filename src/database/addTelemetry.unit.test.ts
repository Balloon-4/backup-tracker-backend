import {
    beforeAll, describe, expect, it, vi,
} from 'vitest';
import { IMemoryDb, newDb } from 'pg-mem';
import fs from 'fs';
// @ts-expect-error CommonJS issue
import type { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { addTelemetry } from './addTelemetry';

describe('addTelemetry.ts', () => {
    let mockPostgres: IMemoryDb;

    beforeAll(() => {
        mockPostgres = newDb();
        mockPostgres.public.none(fs.readFileSync('./src/schema/schema.sql', 'utf8'));
    });

    it('should add telemetry to the database in the correct format', async () => {
        const telemetry = {
            accuracy: 0,
            altitude: 0,
            batteryPercent: 0,
            cellPower: -127,
            cellStrength: 0,
            cellTower: 'lte:ca:ca:427',
            date: '2021-07-18T00:00:00.000Z',
            latitude: 0,
            longitude: 0,
            pressure: 0,
            provider: 'test',
            session: 'test',
            speed: 0,
            temperature: 0,
            timeToFix: 0,
        };

        const queryObject = vi.fn((query: string) => mockPostgres.public.query(query));

        const mockClient = {
            queryObject: queryObject,
        };

        await addTelemetry(mockClient as unknown as Client, telemetry);
        const data = mockPostgres.public.one('SELECT * FROM telemetry LIMIT 1');
        expect(JSON.stringify(data)).toEqual(JSON.stringify(telemetry));
    });

    it('should add telemetry to the database in the correct format with maximized null values', async () => {
        const telemetry = {
            accuracy: null,
            altitude: null,
            batteryPercent: null,
            cellPower: null,
            cellStrength: null,
            cellTower: null,
            date: '2022-07-18T00:00:00.000Z',
            latitude: null,
            longitude: null,
            pressure: null,
            provider: null,
            session: 'test',
            speed: null,
            temperature: null,
            timeToFix: null,
        };

        const queryObject = vi.fn((query: string) => mockPostgres.public.query(query));

        const mockClient = {
            queryObject: queryObject,
        };

        await addTelemetry(mockClient as unknown as Client, telemetry);
        const data = mockPostgres.public.one('SELECT * FROM telemetry ORDER BY date DESC LIMIT 1');
        expect(JSON.stringify(data)).toEqual(JSON.stringify(telemetry));
    });
});