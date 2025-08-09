import * as Joi from 'joi';
import { objectIdSchema } from '../../utils/schema-validator';

export const createEnvironmentSchema = Joi.object({
  name: Joi.string().min(1).required(),
  projectId: objectIdSchema(),
});

export const updateEnvironmentSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  isActive: Joi.string().optional(),
});
