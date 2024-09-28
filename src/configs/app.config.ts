import type { Application } from 'express';
import express from 'express';
import { createServer } from 'http';

import logger from './logger.config';
import { configureResources } from './resources.config';

export function configureApplication(app: Application) {
  app.use(
    express.json({ type: '*/*' }),
    express.urlencoded({ extended: true }),
  );
  configureResources(app);
}

export function startServer(app: Application, port: number) {
  const server = createServer(app);

  server.listen(port, () => {
    logger.info(`server is up and running on port ${port}`);
  });
}
