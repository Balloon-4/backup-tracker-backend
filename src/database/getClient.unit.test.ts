import {
    describe, expect, it,
} from 'vitest';
// @ts-expect-error
import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';
import { Context } from 'cloudworker-router';
import { Env } from '../@types/types';
import { getClient } from './getClient';

describe('getClient.ts', () => {
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