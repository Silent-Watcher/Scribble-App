import { Sequelize } from '@sequelize/core';

import { CONFIGS } from './';
import logger from './logger.config';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: CONFIGS.DB.HOST,
  port: CONFIGS.DB.PORT,
  username: CONFIGS.DB.USER,
  password: CONFIGS.DB.PASSWORD,
  database: CONFIGS.DB.NAME,
  logging: (msg) => {
    logger.info(msg);
  },
  define: {
    freezeTableName: true,
  },
});
