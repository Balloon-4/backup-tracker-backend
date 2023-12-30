import {
    describe, expect, it, vi,
} from 'vitest';
// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Context } from 'cloudworker-router';
import { executeSQL } from './executeSQL';
import { Env } from '../@types/types';

describe('executeSQL.ts', () => {
    it('should call connect(), call the function with the client, and call close()', async () => {
        const client = {
            connect: vi.fn(),
            end: vi.fn(),
        };

        const ctx = { event: { waitUntil: vi.fn() } };

        const func = vi.fn();

        await executeSQL(client as unknown as Client, ctx as unknown as Context<Env>, func);

        expect(client.connect).toHaveBeenCalled();
        expect(func).toHaveBeenCalledWith(client);
        expect(client.end).toHaveBeenCalled();
    });
});