import { join } from 'node:path';
import { cwd, env } from 'process';

export const CONFIGS = Object.freeze({
  DEBUG: env.APP_ENV == 'development',
  ENV: env.NODE_ENV,
  VIEWS: {
    PATH: join(cwd(), 'resources', 'views'),
    ENGINE: 'ejs',
    STATICS: join(cwd(), 'public'),
  },
  LAYOUTS: {
    HOME: join(cwd(), 'resources', 'layouts', 'layout'),
  },
  DB: {
    DIALECT: 'mysql',
    HOST: env.MYSQL_HOST,
    PORT: parseInt(env.MYSQL_PORT),
    USER: env.MYSQL_USER,
    PASSWORD: env.MYSQL_PASS,
    NAME: env.DB_NAME,
  },
  FAVICON: join(cwd(), 'public', 'favicon.icon'),
  APP: {
    PORT: parseInt(env.APP_PORT) || 3000,
    NAME: env.APP_NAME,
    URL: env.APP_URL,
    LOGO: join(cwd(), 'public', 'imgs', 'inkwell.png'),
  },
  RECAPTCHA: {
    V3: {
      SECRET_KEY: env.RECAPTCHA_SECRET_KEY,
      SITE_KEY: env.RECAPTCHA_SITE_KEY,
    },
  },
  SESSION: {
    SECRET: env.SESSION_SECRET,
  },
  TIME: {
    _24h: {
      ms: 24 * 60 * 60 * 10000,
    },
  },
});
