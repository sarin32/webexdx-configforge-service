// environment level constants

import * as dotEnv from 'dotenv';
import { Binary } from 'mongodb';

dotEnv.config();

const env = process.env;

export const PORT = Number(env.PORT!);

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const NODE_ENV = (env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;

export const DATABASE_SETTINGS = {
  URL: env.DATABASE_URL!,
};

// Token validation settings (needed for auth service integration)
export const SECRET_TOKEN = env.JWT_SECRET_TOKEN!;

export const LOG_SETTINGS = {
  PRINT: {
    COLORIZE: NODE_ENV === NodeEnv.DEVELOPMENT,
    LEVEL: env.PRINT_LOG_LEVEL || 'debug',
  },
  FILE: {
    LOG_TO_FILE: NODE_ENV === NodeEnv.DEVELOPMENT,
    LEVEL: env.FILE_LOG_LEVEL || 'debug',
  },
};
