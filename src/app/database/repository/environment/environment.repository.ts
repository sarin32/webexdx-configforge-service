import { environmentModal } from '../../modals';
import {
  CreateEnvironmentParams,
  EnvironmentRepositoryInterface,
  GetEnvironmentListParams,
  GetEnvironmentListResultObject,
} from './environment.repository.interface';

class EnvironmentRepository implements EnvironmentRepositoryInterface {
  private modal = environmentModal;

  async createEnvironment({
    name,
    userId,
    projectId,
  }: CreateEnvironmentParams) {
    const response = await this.modal.insertOne({
      createdAt: new Date(),
      name,
      projectId,
      createdBy: userId,
    });
    if (!response.acknowledged) {
      throw new Error('Failed to insert environment data');
    }
    return { environmentId: response.insertedId };
  }

  async getEnvironmentList({
    projectId,
  }: GetEnvironmentListParams): Promise<GetEnvironmentListResultObject[]> {
    const environments = await this.modal.find({ projectId }).toArray();
    return environments;
  }
}

export const environmentRepository = new EnvironmentRepository();
