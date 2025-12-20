import { environmentRepository } from '../../database';
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
}

export const environmentService = new EnvironmentService();
