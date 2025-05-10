import { environmentRepository } from '../../database';
import {
  CreateEnvironmentParams,
  CreateEnvironmentResult,
  EnvironmentServiceInterface,
  GetEnvironmentListParams,
  HasAccessParams,
  GetEnvironmentListResultObject,
} from './environment.service.interface';
import { rolesService } from '../roles/roles.service';

class EnvironmentService implements EnvironmentServiceInterface {
  private repository = environmentRepository;

  async hasAccessToCreateEnvironment({
    roleId,
  }: HasAccessParams): Promise<boolean> {
    return (
      (await rolesService.getModuleRoleInfo({ module: 'variables', roleId }))
        ?.write || false
    );
  }

  async createEnvironment({
    name,
    projectId,
    userId,
  }: CreateEnvironmentParams): Promise<CreateEnvironmentResult> {
    const { environmentId } = await this.repository.createEnvironment({
      name,
      projectId,
      userId,
    });

    return { environmentId };
  }

  async getEnvironmentList({
    projectId,
  }: GetEnvironmentListParams): Promise<GetEnvironmentListResultObject[]> {
    return await this.repository.getEnvironmentList({ projectId });
  }
}

export const environmentService = new EnvironmentService();
