import { Context } from 'koa';
import {
  booleanSchema,
  objectIdSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import { BadRequestError } from '../../errors';
import { variableService } from '../../services/variable/variable.service';
import { objectId } from '../../utils/data-type-util';

const createVariableSchema = objectSchema({
  object: {
    environmentId: objectIdSchema(),
    key: stringSchema({ min: 1 }),
    value: stringSchema({ required: false }),
    isOverride: booleanSchema(false),
  },
});

const updateVariableSchema = objectSchema({
  object: {
    variableId: objectIdSchema(),
    key: stringSchema({ min: 1, required: false }),
    value: stringSchema({ required: false }),
  },
});

const deleteVariableSchema = objectSchema({
  object: {
    variableId: objectIdSchema(),
  },
});

export async function createVariable(ctx: Context) {
  const { error, value } = validateObject<{
    environmentId: string;
    key: string;
    value: string;
    isOverride?: boolean;
  }>(createVariableSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;
  const { environmentId, key, value: variableValue, isOverride } = value;

  ctx.body = await variableService.createVariable({
    userId,
    environmentId: objectId(environmentId),
    key,
    value: variableValue,
    isOverride: isOverride || false,
  });
}

export async function updateVariable(ctx: Context) {
  const { error, value } = validateObject<{
    variableId: string;
    key: string;
    value: string;
  }>(updateVariableSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  // const { userId } = ctx.state.user;
  const { variableId, key, value: variableValue } = value;

  ctx.body = await variableService.updateVariable({
    variableId: objectId(variableId),
    key,
    value: variableValue,
  });
}

export async function deleteVariable(ctx: Context) {
  const { error, value } = validateObject<{
    variableId: string;
  }>(deleteVariableSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  // const { userId } = ctx.state.user;
  const { variableId } = value;

  ctx.body = await variableService.deleteVariable({
    variableId: objectId(variableId),
  });
}
