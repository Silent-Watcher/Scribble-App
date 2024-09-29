import { configSwaggerV1 } from '$api/v1/swagger.config';
import { startRouter } from '$app/common/router';
import { CONFIGS } from '$app/configs';
import { configureApplication, startServer } from '$configs/app.config';
import { sequelize } from '$configs/db.config';
import logger, { startLogger } from '$configs/logger.config';
import { configureErrorHandler } from '$middlewares/errorHandler.middleware';
import express from 'express';

import type { Application } from 'express';
const app: Application = express();

const { PORT } = CONFIGS.APP;

configureApplication(app);
startLogger(app);
startRouter(app);
configSwaggerV1(app);

sequelize.authenticate().then(async () => {
  // if (DEBUG) await sequelize.sync({ force: true });
  logger.info('MYSQL Connection has been established successfully!');
  startServer(app, PORT);
}).catch(err => {
  logger.error('Unable to connect to the database:', err);
  process.exit(1); // Exit the process with a failure code
});


configureErrorHandler(app);
