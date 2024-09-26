import { startRouter } from '$app/common/router';
import { CONFIGS } from '$app/configs';
import { configureApplication, startServer } from '$configs/app.config';
import logger, { startLogger } from '$configs/logger.config';
import { configureErrorHandler } from '$middlewares/errorHandler.middleware';
import express from 'express';

import { sequelize } from './configs/db.config';

import type { Application } from 'express';
const app: Application = express();

const { PORT, DEBUG } = CONFIGS;

configureApplication(app);
startLogger(app);
startRouter(app);

sequelize.authenticate().then(async () => {
  await sequelize.sync({ ...(DEBUG ? { force: true } : { alter: true }) });
  logger.info(' MYSQL Connection has been established successfully!');
  startServer(app, PORT);
});

configureErrorHandler(app);
