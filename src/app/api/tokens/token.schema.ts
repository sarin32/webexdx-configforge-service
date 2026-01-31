import * as Joi from 'joi';
import { objectIdSchema } from '../../utils/schema-validator';

export const createTokenSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  environmentId: objectIdSchema(),
  expiresInDays: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
});

export const updateTokenSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  isActive: Joi.alternatives().try(Joi.string(), Joi.boolean()).optional(),
  expiresInDays: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
});

export const getTokenSchema = Joi.object({
  tokenId: objectIdSchema(),
});

export const getEnvironmentTokensSchema = Joi.object({
  environmentId: objectIdSchema(),
});

export const getUserTokensSchema = Joi.object({
  userId: objectIdSchema(),
});
