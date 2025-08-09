import * as Joi from 'joi';
import { objectIdSchema } from '../../utils/schema-validator';

export const createVariableSchema = Joi.object({
  environmentId: objectIdSchema(),
  key: Joi.string().min(1).required(),
  value: Joi.string().optional(),
  isOverride: Joi.boolean().default(false),
});

export const updateVariableSchema = Joi.object({
  key: Joi.string().min(1).optional(),
  value: Joi.string().optional(),
});
