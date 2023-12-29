import { Context, Next } from 'cloudworker-router';

export interface Env {
    DB: D1Database;
    DATABASE_PASSWORD: string;
    TUNNEL_HOST: string;
    CF_CLIENT_ID: string;
    CF_CLIENT_SECRET: string;
}

export interface IMidware {
    generate: (ctx: Context<Env>, next: Next) => Promise<Response | undefined>
}

export enum Route {
    DATA = '/data',
}