import { ObjectId } from 'mongodb';
import { variableRepository } from '../../database';
import type { CreateVariableParams as CreateVariableRepoParams } from '../../database/repository/variable/variable.repository.interface';
import type {
  CreateVariableParams,
  DeleteVariableParams,
  GetVariableListObject,
  GetVariableListParams,
  UpdateVariableParams,
  VariableServiceInterface,
} from './variable.service.interface';

class VariableService implements VariableServiceInterface {
  private readonly repository = variableRepository;


  async createVariable({
    environmentId,
    key,
    value,
    userId,
    isOverride = false,
  }: CreateVariableParams) {
    const variableObject: CreateVariableRepoParams = {
      environmentId,
      key,
      value,
    };

    if (isOverride) variableObject.overrideUserId = userId;

    const response = await this.repository.createVariable(variableObject);
    return { variableId: response.variableId };
  }

  async getVariableList({
    environmentId,
    userId,
  }: GetVariableListParams): Promise<GetVariableListObject[]> {
    return await this.repository.getVariableList({ environmentId, userId });
  }

  async updateVariable({
    variableId,
    key,
    value,
  }: UpdateVariableParams): Promise<void> {
    await this.repository.updateVariable({ variableId, key, value });
  }

  async deleteVariable({ variableId }: DeleteVariableParams): Promise<void> {
    await this.repository.deleteVariable({ variableId });
  }

  async deleteEnvironmentVariables({
    environmentId,
  }: {
    environmentId: ObjectId;
  }): Promise<void> {
    await this.repository.deleteEnvironmentVariables({ environmentId });
  }
}

export const variableService = new VariableService();
