import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import {
    afterAll, beforeAll, describe, expect, it,
} from 'vitest';

describe('Route /iris', () => {
    let worker: UnstableDevWorker;

    beforeAll(async () => {
        worker = await unstable_dev('src/index.ts');
    });

    afterAll(async () => {
        await worker.stop();
    });

    
});