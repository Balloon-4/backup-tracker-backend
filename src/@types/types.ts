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
    altitude: number | null;
    accuracy: number | null;
    batteryPercent: number | null;
    cellPower: number | null,
    cellStrength: number | null;
    cellTower: string | null,
    date: string;
    latitude: number | null;
    longitude: number | null;
    provider: string | null;
    pressure: number | null;
    session: string;
    speed: number | null;
    temperature: number | null;
    timeToFix: number | null;
}

export interface Log {
    content: string;
    date: string;
    level: string;
    session: string;
}
