# Balloon-4 Backup Tracker

This project provides an endpoint/API for a backup tracker to send telemetry to. Received telemetry is then saved to a PostgreSQL database, whose connection is currently provided over a Cloudflare Access protected Cloudflare Tunnel.

## Prerequisites

- Node.js LTS version
- NPM

## Install

Install dependencies with

```sh
npm i
```

## Variables

Add the following secrets

1. [with a .dev.vars file in development](https://developers.cloudflare.com/workers/configuration/secrets/#secrets-in-development) or
2. [with the Cloudflare dashboard or Wrangler CLI in production](https://developers.cloudflare.com/workers/configuration/secrets/#secrets-on-deployed-workers)

| Variable          | Description                                            | Type   |
| ----------------- | ------------------------------------------------------ | ------ |
| `CF_CLIENT_ID`  | Cloudflare Access Client Id to PostgreSQL database     | Secret |
| `CF_CLIENT_SEC` | Cloudflare Access Client Secret to PostgreSQL database | Secret |
| `DATABASE_PASS` | Password to the PostgreSQL database                    | Secret |
| `TUNNEL_HOST`   | Cloudflare Tunnel URL for the PostgreSQL database      | Secret |

## Development

To start the development server, run:

```sh
npm run start
```

## Testing

To run the unit tests, use:

```sh
npm run test
```

## Deployment

To deploy the application to Cloudflare, use:

```sh
npm run deploy
```
