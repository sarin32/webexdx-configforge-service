import type { ObjectId } from '@i/common.interface';
import type { GetEnvironmentListResultObject as GetEnvironmentListResultRepoObject } from '../../database/repository/environment/environment.repository.interface';

export interface CreateEnvironmentParams {
  name: string;
  userId: ObjectId;
  projectId: ObjectId;
}

export interface CreateEnvironmentResult {
  environmentId: ObjectId;
}

export interface GetEnvironmentListParams {
  projectId: ObjectId;
}

export type GetEnvironmentListResultObject = GetEnvironmentListResultRepoObject;

export interface EnvironmentServiceInterface {
  createEnvironment(
    params: CreateEnvironmentParams,
  ): Promise<CreateEnvironmentResult>;

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
