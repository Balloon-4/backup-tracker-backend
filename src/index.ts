import { Router } from 'cloudworker-router';
import type { Env } from './@types/types';
import data from './routes/data';

export const router = new Router<Env>();

router.use(async (_, next) => {
    const response = await next();
    response?.headers.set('Access-Control-Allow-Origin', '*');
    response?.headers.set('Access-Control-Allow-Methods', 'GET');
    response?.headers.set('Date', new Date().toUTCString());

    return response;
});

data(router);

export default {
    fetch: async (request, env, ctx): Promise<Response> => router.handle(request, env, ctx),
} as ExportedHandler<Env>;