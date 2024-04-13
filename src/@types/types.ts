import { Context, Next } from 'cloudworker-router';

export interface Env {
    // DB: D1Database;
    DATABASE_PASSWORD: string;
    TUNNEL_HOST: string;
    CF_CLIENT_ID: string;
    CF_CLIENT_SECRET: string;
}

export interface IMidware {
    generate: (ctx: Context<Env>, next: Next) => Promise<Response | undefined>
}

export enum Route {
    TELEMETRY = '/telemetry',
    LOG = '/log',
}

export interface Telemetry {
    altitude: number;
    accuracy: number;
    batteryPercent: number;
    cellStrength: number;
    date: string;
    latitude: number;
    longitude: number;
    provider: string;
    session: string;
    speed: number;
    temperature: number;
}

export interface Log {
    content: string;
    date: string;
    level: string;
    session: string;
}