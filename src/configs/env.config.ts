import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import logger from './logger.config';

const environmentSchema = z.object({
  APP_PORT: z.string(),

  NODE_ENV: z.enum(['development', 'production']),
  APP_ENV: z.enum(['development', 'production']),

  MYSQL_HOST: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASS: z.string(),
  MYSQL_PORT: z.string(),

  APP_NAME: z.literal('Scribble'),
  APP_URL: z.string().trim().url(),

  DB_NAME: z.string(),
  DB_URL: z.string(),

  RECAPTCHA_SITE_KEY: z.string(),
  RECAPTCHA_SECRET_KEY: z.string(),

  SESSION_SECRET: z.string(),
});

const envParsedResult = environmentSchema.safeParse(process.env);

if (!envParsedResult.success) {
  logger.error(fromZodError(envParsedResult.error).message);
  throw new Error('there is an error with env variables!');
}

type EnvVarSchemaType = z.infer<typeof environmentSchema>;

declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
