import { join } from 'node:path';

export const CONFIGS = Object.freeze({
  PORT: parseInt(process.env.PORT) || 3000,
  DEBUG: process.env.APP_ENV == 'development',
  ENV: process.env.NODE_ENV,
  VIEWS: {
    PATH: join(process.cwd(), 'resources', 'views'),
    ENGINE: 'ejs',
    STATICS: join(process.cwd(), 'public'),
  },
  LAYOUTS: {
    HOME: join(process.cwd(), 'resources', 'layouts', 'layout'),
  },
  DB: {
    DIALECT: 'mysql',
    HOST: process.env.MYSQL_HOST,
    PORT: parseInt(process.env.MYSQL_PORT),
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASS,
    NAME: process.env.DB_NAME,
  },
  FAVICON: join(process.cwd(), 'public', 'favicon.icon'),
});
