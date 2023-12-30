import type { Context, Next } from 'cloudworker-router';
// @ts-expect-error
import { Schema, Validator } from '@cfworker/json-schema';
import type { Env, IMidware } from '../@types/types';

export class JSONBodyValidateMidware implements IMidware {
    private readonly validator: Validator;

    public constructor(schema: Schema) {
        this.validator = new Validator(schema);
        this.generate = this.generate.bind(this);
    }

    public async generate(ctx: Context<Env>, next: Next): Promise<Response | undefined> {
        let body: unknown;

        try {
            body = await ctx.request.clone().json();
        } catch (error) {
            return new Response(String(error), {
                status: 400,
            });
        }

        const results = this.validator.validate(body);

        if (!results.valid) {
            return new Response(JSON.stringify(results.errors), {
                status: 400,
            });
        }

        return next();
    }
}