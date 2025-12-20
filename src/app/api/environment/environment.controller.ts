import { BadRequestError, ForbiddenError } from '@webexdx/koa-wrap/errors';
import type { Context } from 'koa';
import { environmentService } from '../../services/environment/environment.service';
import { objectId } from '../../utils/data-type-util';
import { validateObject } from '../../utils/schema-validator';
import { createEnvironmentSchema } from './environment.schema';

export async function createEnvironment(ctx: Context) {
  const { error, value } = validateObject<{
    name: string;
    projectId: string;
  }>(createEnvironmentSchema, ctx.request.body);

  const { userId, roleId } = ctx.state.user;

  if (!environmentService.hasAccessToCreateEnvironment({ roleId })) {
    throw new ForbiddenError("You don't have the acces to create environment");
  }

  if (error) throw new BadRequestError(error.message);

  const { name, projectId } = value;

  ctx.body = await environmentService.createEnvironment({
    userId,
    projectId: objectId(projectId),
    name,
  });
}
