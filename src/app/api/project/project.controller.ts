import { Context } from 'koa';
import { projectService } from '../../services/project/project.service';
import {
  objectIdSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import { BadRequestError, ForbiddenError } from '../../errors';
import { objectId } from '../../utils/data-type-util';

const createProjectSchema = objectSchema({
  object: {
    name: stringSchema({ min: 1 }),
  },
});

const updateProjectSchema = objectSchema({
  object: {
    name: stringSchema({ min: 1 }),
    projectId: objectIdSchema(),
  },
});

const getProjectdataInDetailSchema = objectSchema({
  object: {
    projectId: objectIdSchema(),
  },
});

export async function createProject(ctx: Context) {
  const { error, value } = validateObject<{ name: string }>(
    createProjectSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await projectService.hasAccessToCreateProject({ roleId })))
    throw new ForbiddenError('You dont have the access to create project ');

  const { name } = value;

  ctx.body = await projectService.createProject({ userId, name });
}

export async function getProjectlist(ctx: Context) {
  const { userId, roleId } = ctx.state.user;

  if (!(await projectService.hasAccessToReadProject({ roleId })))
    throw new ForbiddenError('You dont have the access to read project ');

  ctx.body = await projectService.getProjectList({ userId });
}

export async function updateProjectDetails(ctx: Context) {
  const { userId, roleId } = ctx.state.user;

  if (!(await projectService.hasAccessToCreateProject({ roleId })))
    throw new ForbiddenError('You dont have the access to update projects');

  const { error, value } = validateObject<{ name: string; projectId: string }>(
    updateProjectSchema,
    ctx.request.body
  );

  const { name, projectId } = value;

  if (error) throw new BadRequestError(error.message);

  if (
    !(await projectService.hasEditAccessToProject({
      projectId: objectId(projectId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  ctx.body = await projectService.updateProject({
    name,
    projectId: objectId(projectId),
  });
}

export async function getProjectDataInDetail(ctx: Context) {
  const { userId, roleId } = ctx.state.user;

  // check for role level access to read projects
  if (!(await projectService.hasAccessToReadProject({ roleId })))
    throw new ForbiddenError('You dont have the access to read projects');

  const { error, value } = validateObject<{ projectId: string }>(
    getProjectdataInDetailSchema,
    ctx.request.body
  );

  const { projectId } = value;

  if (error) throw new BadRequestError(error.message);

  // check for access to the specific project resource
  if (
    !(await projectService.hasReadAccessToProject({
      projectId: objectId(projectId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  // get the data
  ctx.body = await projectService.getProjectDataInDetail({
    userId,
    projectId: objectId(projectId),
  });
}
