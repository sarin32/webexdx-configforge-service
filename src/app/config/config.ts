// environment level constants

import { Binary } from 'mongodb';
import * as dotEnv from 'dotenv';

dotEnv.config();

const env = process.env;

export const PORT = Number(env.PORT!);

export const NODE_ENV = env.NODE_ENV;

export const DATABASE_SETTINGS = {
  URL: env.DATABASE_URL!,
};

// Token validation settings (needed for auth service integration)
export const SECRET_TOKEN = env.JWT_SECRET_TOKEN!;
