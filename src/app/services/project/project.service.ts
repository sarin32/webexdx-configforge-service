import { projectRepository } from '../../database';
import {
  CreateProjectParams,
  GetProjectParams,
  GetProjectListResult,
  ProjectServiceInterface,
  UpdateProjectParams,
  HasAccessParams,
  HasAccessToProjectParams,
  GetProjectDataInDetailParams,
  GetProjectDataInDetailResult,
} from './project.service.interface';
import { rolesService } from '../roles/roles.service';
import { ProjectAccessLevel } from '../../config';
import { environmentService } from '../environment/environment.service';
import { variableService } from '../variable/variable.service';

class ProjectService implements ProjectServiceInterface {
  private readonly repository = projectRepository;

  async hasAccessToCreateProject({
    roleId,
  }: HasAccessParams): Promise<boolean> {
    const respose = await rolesService.getModuleRoleInfo({
      roleId,
      module: 'projects',
    });
    return respose?.write || false;
  }

  async hasAccessToReadProject({ roleId }: HasAccessParams): Promise<boolean> {
    const respose = await rolesService.getModuleRoleInfo({
      roleId,
      module: 'projects',
    });
    return respose?.read || false;
  }

  async hasEditAccessToProject({
    projectId,
    userId,
  }: HasAccessToProjectParams): Promise<boolean> {
    const access = await this.repository.getAccessLevelToProject({
      projectId,
      userId,
    });

    if (!access) return false;

    return [ProjectAccessLevel.ADMIN, ProjectAccessLevel.WRITE].includes(
      access
    );
  }

  async hasReadAccessToProject({
    projectId,
    userId,
  }: HasAccessToProjectParams): Promise<boolean> {
    const access = await this.repository.getAccessLevelToProject({
      projectId,
      userId,
    });

    if (!access) return false;

    return [
      ProjectAccessLevel.ADMIN,
      ProjectAccessLevel.WRITE,
      ProjectAccessLevel.READ,
    ].includes(access);
  }

  async createProject({ name, userId }: CreateProjectParams) {
    const { projectId } = await this.repository.createProject({
      name,
      userId,
    });
    return { projectId };
  }

  // addProjectUser({}: AddProjectUserParams): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }

  async getProjectList({
    userId,
  }: GetProjectParams): Promise<GetProjectListResult> {
    return await this.repository.getProjectList({ userId });
  }

  async updateProject({ name, projectId }: UpdateProjectParams): Promise<void> {
    await this.repository.updateProject({ name, projectId });
  }

  async getProjectDataInDetail({
    projectId,
    userId,
  }: GetProjectDataInDetailParams): Promise<GetProjectDataInDetailResult> {
    const project = await this.repository.getProject({ projectId });

    const result: GetProjectDataInDetailResult = {
      createdAt: project.createdAt,
      environments: [],
      id: project._id,
      name: project.name,
    };

    const environments = await environmentService.getEnvironmentList({
      projectId,
    });

    for (const environment of environments) {
      const variables = await variableService.getVariableList({
        environmentId: environment._id,
        userId,
      });

      result.environments.push({
        environmentName: environment.name,
        id: environment._id,
        variables: variables.map(variable => {
          const isOverride =
            (variable.overrideUserId &&
              variable.overrideUserId.toString() === userId.toString()) ||
            false;

          return {
            isOverride,
            key: variable.key,
            value: variable.value,
            id: variable._id,
          };
        }),
      });
    }

    return result;
  }
}

export const projectService = new ProjectService();
