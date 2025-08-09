import * as Joi from 'joi';

export const createProjectSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(1).required(),
});
