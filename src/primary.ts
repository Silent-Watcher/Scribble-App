import cluster from 'cluster';
import os from 'os';
import path from 'path';

import logger from './configs/logger.config';

const cpuLength = os.cpus().length;

cluster.setupPrimary({
  exec: path.join(process.cwd(), 'src', 'common', 'bootstrap.ts'),
});

for (let index = 0; index < cpuLength; index++) {
  cluster.fork();
}


let retryCount = 0;
const maxRetries = 5;

cluster.on('exit', (worker) => {
    if (retryCount < maxRetries) {
        logger.info(`Worker ${worker.process.pid} died. Attempting restart (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
            cluster.fork();
        }, 2000); // Delay before forking a new worker
        retryCount++;
    } else {
        logger.info(`Max retries reached. Not forking new worker.`);
    }
});

