import {
    beforeAll, describe, expect, it, vi,
} from 'vitest';
import { IMemoryDb, newDb } from 'pg-mem';
import fs from 'fs';
// @ts-expect-error CommonJS issue
import type { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { addLog } from './addLog';

describe('addTelemetry.ts', () => {
    let mockPostgres: IMemoryDb;

    beforeAll(() => {
        mockPostgres = newDb();
        mockPostgres.public.none(fs.readFileSync('./src/schema/schema.sql', 'utf8'));
    });

    it('should add telemetry to the database in the correct format', () => {
        const log = {
            content: '🚨🚨🚨🚨🚨🚨🚨🚨🚨 uh oh ඞඞඞඞඞඞඞඞඞඞඞඞඞඞ',
            date: '2021-07-18T00:00:00.000Z',
            level: 'error',
            session: 'test',
        };

        const queryObject = vi.fn((query: string) => mockPostgres.public.query(query));

        const mockClient = {
            queryObject: queryObject,
        };

        addLog(mockClient as unknown as Client, log);
        const data = mockPostgres.public.one('SELECT * FROM log LIMIT 1');
        expect(JSON.stringify(data)).toEqual(JSON.stringify({
            ...log,
            index: 1,
        }));
    });
});