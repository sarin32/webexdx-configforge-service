import type { ObjectId } from '@i/common.interface';
import type { WithId } from 'mongodb';
import type { VariableSchema } from '../../modals/variable.modal.interface';

export interface CreateVariableParams {
  overrideUserId?: ObjectId;
  environmentId: ObjectId;
  key: string;
  value: string;
}

export interface CreateVariableResult {
  variableId: ObjectId;
}

export interface GetVariableListParams {
  userId: ObjectId;
  environmentId: ObjectId;
}
export type GetVariableListObject = WithId<VariableSchema>;

export interface UpdateVariableParams {
  variableId: ObjectId;
  key?: string;
  value?: string;
}

export interface DeleteVariableParams {
  variableId: ObjectId;
}

export interface VariableRepositoryInterface {
  createVariable(params: CreateVariableParams): Promise<CreateVariableResult>;

  getVariableList(
    params: GetVariableListParams,
  ): Promise<GetVariableListObject[]>;

  updateVariable(params: UpdateVariableParams): Promise<void>;

  deleteVariable(params: DeleteVariableParams): Promise<void>;

  deleteEnvironmentVariables(params: {
    environmentId: ObjectId;
  }): Promise<void>;
}
