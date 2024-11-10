import {
    describe, expect, it, vi,
} from 'vitest';
// @ts-expect-error CommonJS issue
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Context } from 'cloudworker-router';
import { Env } from '../@types/types';
import { executeSQL, getClient } from './database';

describe('database.ts', () => {
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

    it('should set Access headers through globalThis and return an instance of Client', async () => {
        const ctx = {
            env: {
                CF_CLIENT_ID: 'id',
                CF_CLIENT_SECRET: 'secret',
            },
        };

        const client = getClient(ctx as unknown as Context<Env>);

        // @ts-expect-error
        expect(globalThis.CF_CLIENT_ID).toEqual('id');
        // @ts-expect-error
        expect(globalThis.CF_CLIENT_SECRET).toEqual('secret');
        expect(client).toBeInstanceOf(Client);
    });
});
