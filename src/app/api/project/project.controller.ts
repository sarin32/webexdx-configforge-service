import { BadRequestError, ForbiddenError } from '@webexdx/koa-wrap/errors';
import type { Context } from 'koa';
import { projectService } from '../../services/project/project.service';
import { objectId } from '../../utils/data-type-util';
import { validateObject } from '../../utils/schema-validator';
import { createProjectSchema, updateProjectSchema } from './project.schema';

export async function createProject(ctx: Context) {
  const { error, value } = validateObject<{ name: string }>(
    createProjectSchema,
    ctx.request.body,
  );

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  const { name } = value;

  ctx.body = await projectService.createProject({ userId, name });
}

export async function getProjectlist(ctx: Context) {
  const { userId } = ctx.state.user;

  ctx.body = await projectService.getProjectList({ userId });
}

export async function updateProjectDetails(ctx: Context) {
  const { id } = ctx.params;
  const { error, value } = validateObject<{
    name: string;
  }>(updateProjectSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  if (
    !(await projectService.hasEditAccessToProject({
      projectId: objectId(id),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  const { name } = value;

  ctx.body = await projectService.updateProject({
    name,
    projectId: objectId(id),
  });
}

export async function getProjectDataInDetail(ctx: Context) {
  const { id } = ctx.params;
  const { userId } = ctx.state.user;

  if (
    !(await projectService.hasReadAccessToProject({
      projectId: objectId(id),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  ctx.body = await projectService.getProjectDataInDetail({
    userId,
    projectId: objectId(id),
  });
}
