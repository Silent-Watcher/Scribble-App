import type { Application } from 'express';
import compression from 'compression';
import SequelizeStore from 'connect-session-sequelize';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import { createServer } from 'http';

import { CONFIGS } from './';
import { sequelize } from './db.config';
import logger from './logger.config';
import { configureResources } from './resources.config';

const sequelizeStore = SequelizeStore(session.Store);

export function configureApplication(app: Application) {
  // basic middlewares
  app.use(express.json(), express.urlencoded({ extended: true }));
  // !! setup helmet
  // api call rate limitation
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 200, // Limit each IP to 100 requests per 15 minutes
    }),
  );

  app.use(
    session({
      secret: CONFIGS.SESSION.SECRET,
      resave: false,
      saveUninitialized: false,
      store: new sequelizeStore({
        db: sequelize,
      }),
      cookie: {
        domain: '/',
        maxAge: CONFIGS.TIME._24h.ms,
        httpOnly: true,
        secure: !CONFIGS.DEBUG,
        sameSite: 'strict',
      },
    }),
  );

  // response compression
  app.use(compression({}));

  configureResources(app);
}

export function startServer(app: Application, port: number) {
  const server = createServer(app);

  server.listen(port, () => {
    logger.info(`server is up and running on port ${port}`);
  });
}
