import {
    describe, expect, it, vi,
} from 'vitest';
import { Context } from 'cloudworker-router';
// @ts-expect-error
import { Schema } from '@cfworker/json-schema';
import { Env } from '../@types/types';
import { JSONBodyValidateMidware } from './JSONBodyValidateMidware';

export const schema: Schema = {
    $id: '#/definitions/Test',
    $schema: 'http://json-schema.org/draft-07/schema#',
    properties: {
        foo: {
            type: 'string',
        },
        bar: {
            type: ['number', 'null'],
        },
    },
    required: ['foo'],
    type: 'object',
};

describe('JSONBodyValidateMidware.ts', () => {
    const jsonBodyValidateMidware = new JSONBodyValidateMidware(schema);

    it('should call next() if body is valid', async () => {
        const ctx = {
            request: new Request('https://local.local', {
                method: 'POST',
                body: JSON.stringify({ foo: 'string', bar: null }),
            }),
        } as Context<Env>;

        const next = vi.fn();

        await jsonBodyValidateMidware.generate(ctx, next);

        expect(next).toHaveBeenCalled();
    });

    it('should send a 400 response if body is invalid', async () => {
        const ctx = {
            request: new Request('https://local.local', {
                method: 'POST',
                body: JSON.stringify({ foo: 1, bar: null }),
            }),
        } as Context<Env>;

        const next = vi.fn();

        const res = (await jsonBodyValidateMidware.generate(ctx, next))!;

        expect(next).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
    });
});
