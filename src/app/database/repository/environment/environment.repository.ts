import { environmentModal } from '../../modals';
import type {
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

  async deleteProjectEnvironments({
    projectId,
  }: GetEnvironmentListParams): Promise<void> {
    await this.modal.deleteMany({ projectId });
  }
}

export const environmentRepository = new EnvironmentRepository();
