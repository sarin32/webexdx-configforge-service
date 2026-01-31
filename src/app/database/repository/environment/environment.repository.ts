import { ObjectId } from 'mongodb';
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

  async getEnvironment({ environmentId }: { environmentId: ObjectId }): Promise<GetEnvironmentListResultObject | null> {
    return await this.modal.findOne({ _id: environmentId });
  }

  async deleteEnvironment({ environmentId }: { environmentId: ObjectId }): Promise<void> {
    const response = await this.modal.deleteOne({ _id: environmentId });
    if (!response.acknowledged || response.deletedCount !== 1) {
      throw new Error('Failed to delete environment data');
    }
  }

  async updateEnvironment(environmentId: ObjectId, data: { name?: string }): Promise<void> {
    const response = await this.modal.updateOne(
      { _id: environmentId },
      { $set: data },
    );

    if (!response.acknowledged || (response.modifiedCount !== 1 && response.matchedCount !== 1)) {
      throw new Error('Failed to update environment data');
    }
  }

  async deleteProjectEnvironments({
    projectId,
  }: GetEnvironmentListParams): Promise<void> {
    await this.modal.deleteMany({ projectId });
  }
}

export const environmentRepository = new EnvironmentRepository();
