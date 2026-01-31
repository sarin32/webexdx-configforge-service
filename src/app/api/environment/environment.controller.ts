import { BadRequestError, ForbiddenError } from '@webexdx/koa-wrap/errors';
import type { Context } from 'koa';
import { environmentService } from '../../services/environment/environment.service';
import { projectService } from '../../services/project/project.service';
import { objectId } from '../../utils/data-type-util';
import { validateObject } from '../../utils/schema-validator';
import { createEnvironmentSchema, updateEnvironmentSchema } from './environment.schema';

export async function createEnvironment(ctx: Context) {
  const { error, value } = validateObject<{
    name: string;
    projectId: string;
  }>(createEnvironmentSchema, ctx.request.body);

  const { userId } = ctx.state.user;


  if (error) throw new BadRequestError(error.message);

  const { name, projectId } = value;

  if (
    !(await projectService.hasEditAccessToProject({
      projectId: objectId(projectId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  const result = await environmentService.createEnvironment({
    userId,
    projectId: objectId(projectId),
    name,
  });

  await projectService.updateEnvironmentCount(objectId(projectId), 1);

  ctx.body = result;
}

export async function updateEnvironment(ctx: Context) {
  const { id } = ctx.params;
  const { error, value } = validateObject<{
    name?: string;
  }>(updateEnvironmentSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;
  const envId = objectId(id);

  // 1. Fetch environment to get projectId
  const environment = await environmentService.getEnvironment({ environmentId: envId });
  if (!environment) {
    throw new BadRequestError('Environment not found');
  }

  // 2. Access Check
  if (
    !(await projectService.hasEditAccessToProject({
      projectId: environment.projectId,
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  // 3. Update
  const { name } = value;
  await environmentService.updateEnvironment(envId, { name });

  ctx.status = 204;
}

export async function deleteEnvironment(ctx: Context) {
  const { id } = ctx.params;
  const { userId } = ctx.state.user;
  const envId = objectId(id);

  // 1. Fetch the environment to get projectId
  const environment = await environmentService.getEnvironment({ environmentId: envId });
  if (!environment) {
    throw new BadRequestError('Environment not found');
  }

  const projectId = environment.projectId;

  // 2. Access Check
  if (
    !(await projectService.hasEditAccessToProject({
      projectId,
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  // 3. Delete the environment (and variables via service)
  await environmentService.deleteEnvironment({ environmentId: envId });

  // 4. Update project environment count
  await projectService.updateEnvironmentCount(projectId, -1);

  ctx.status = 204;
}
