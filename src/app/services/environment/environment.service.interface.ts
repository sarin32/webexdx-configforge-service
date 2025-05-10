import { ObjectId } from '@i/common.interface';
import { GetEnvironmentListResultObject as GetEnvironmentListResultRepoObject } from '../../database/repository/environment/environment.repository.interface';

export interface HasAccessParams {
  roleId: ObjectId;
}

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
  hasAccessToCreateEnvironment(params: HasAccessParams): Promise<boolean>;

  createEnvironment(
    params: CreateEnvironmentParams
  ): Promise<CreateEnvironmentResult>;

  getEnvironmentList(
    params: GetEnvironmentListParams
  ): Promise<GetEnvironmentListResultObject[]>;
}
