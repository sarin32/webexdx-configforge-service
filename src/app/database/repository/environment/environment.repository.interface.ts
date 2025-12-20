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
}
