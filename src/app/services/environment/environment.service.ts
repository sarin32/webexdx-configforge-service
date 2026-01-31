import { environmentRepository } from '../../database';
import { variableService } from '../variable/variable.service';
import type { ObjectId } from '@i/common.interface';
import type {
  CreateEnvironmentParams,
  CreateEnvironmentResult,
  EnvironmentServiceInterface,
  GetEnvironmentListParams,
  GetEnvironmentListResultObject,
} from './environment.service.interface';

class EnvironmentService implements EnvironmentServiceInterface {
  private repository = environmentRepository;


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

  async getEnvironment({ environmentId }: { environmentId: ObjectId }): Promise<GetEnvironmentListResultObject | null> {
    return await this.repository.getEnvironment({ environmentId });
  }

  async deleteEnvironment({ environmentId }: { environmentId: ObjectId }): Promise<void> {
    // 1. Delete associated variables
    await variableService.deleteEnvironmentVariables({ environmentId });

    // 2. Delete the environment
    await this.repository.deleteEnvironment({ environmentId });
  }

  async updateEnvironment(environmentId: ObjectId, data: { name?: string }): Promise<void> {
    await this.repository.updateEnvironment(environmentId, data);
  }

  async deleteProjectEnvironments({
    projectId,
  }: GetEnvironmentListParams): Promise<void> {
    await this.repository.deleteProjectEnvironments({ projectId });
  }
}

export const environmentService = new EnvironmentService();
