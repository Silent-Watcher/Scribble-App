import cluster from 'cluster';
import os from 'os';
import path from 'path';

const cpuLength = os.cpus().length;

cluster.setupPrimary({
  exec: path.join(process.cwd(), 'src', 'common', 'bootstrap.ts'),
});

for (let index = 0; index < cpuLength; index++) {
  cluster.fork();
}

cluster.on('exit', () => cluster.fork());
