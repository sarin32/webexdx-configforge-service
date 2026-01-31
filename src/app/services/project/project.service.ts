import type { ObjectId } from 'mongodb';
import { ProjectAccessLevel } from '../../config';
import { projectRepository } from '../../database';
import { environmentService } from '../environment/environment.service';
import { variableService } from '../variable/variable.service';
import type {
  CreateProjectParams,
  GetProjectDataInDetailParams,
  GetProjectDataInDetailResult,
  GetProjectListResult,
  GetProjectParams,
  HasAccessToProjectParams,
  ProjectServiceInterface,
  UpdateProjectParams,
} from './project.service.interface';

class ProjectService implements ProjectServiceInterface {
  private readonly repository = projectRepository;

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
      access,
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
        variables: variables.map((variable) => {
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

  async deleteProject({ projectId }: { projectId: ObjectId }): Promise<void> {
    // 1. Get all environments for this project
    const environments = await environmentService.getEnvironmentList({
      projectId,
    });

    // 2. For each environment, delete its variables
    for (const env of environments) {
      await variableService.deleteEnvironmentVariables({
        environmentId: env._id,
      });
    }

    // 3. Delete all environments
    await environmentService.deleteProjectEnvironments({ projectId });

    // 4. Finally delete the project
    await this.repository.deleteProject({ projectId });
  }

  async updateEnvironmentCount(
    projectId: ObjectId,
    increment: number,
  ): Promise<void> {
    await this.repository.updateEnvironmentCount(projectId, increment);
  }
}

export const projectService = new ProjectService();
