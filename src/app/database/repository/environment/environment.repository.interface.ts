import type { ObjectId, WithId } from 'mongodb';
import type { EnvironmentSchema } from '../../modals/environment.modal.interface';

export interface CreateEnvironmentParams {
  name: string;
  userId: ObjectId;
  projectId: ObjectId;
}

export interface GetEnvironmentListParams {
  projectId: ObjectId;
}

export type GetEnvironmentListResultObject = WithId<EnvironmentSchema>;
export interface EnvironmentRepositoryInterface {
  createEnvironment(
    params: CreateEnvironmentParams,
  ): Promise<{ environmentId: ObjectId }>;

  getEnvironmentList(
    params: GetEnvironmentListParams,
  ): Promise<GetEnvironmentListResultObject[]>;

  getEnvironment(params: {
    environmentId: ObjectId;
  }): Promise<GetEnvironmentListResultObject | null>;

  deleteEnvironment(params: { environmentId: ObjectId }): Promise<void>;

  updateEnvironment(
    environmentId: ObjectId,
    data: { name?: string },
  ): Promise<void>;

  deleteProjectEnvironments(params: GetEnvironmentListParams): Promise<void>;
}
