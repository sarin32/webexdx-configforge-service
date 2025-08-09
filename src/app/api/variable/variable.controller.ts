import { Context } from 'koa';
import { validateObject } from '../../utils/schema-validator';
import { BadRequestError } from '@webexdx/koa-wrap/errors';
import { variableService } from '../../services/variable/variable.service';
import { objectId } from '../../utils/data-type-util';
import { createVariableSchema, updateVariableSchema } from './variable.schema';

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
  const { id } = ctx.params;
  const { error, value } = validateObject<{
    key?: string;
    value?: string;
  }>(updateVariableSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { key, value: variableValue } = value;

  ctx.body = await variableService.updateVariable({
    variableId: objectId(id),
    key,
    value: variableValue,
  });
}

export async function deleteVariable(ctx: Context) {
  const { id } = ctx.params;

  ctx.body = await variableService.deleteVariable({
    variableId: objectId(id),
  });
}
