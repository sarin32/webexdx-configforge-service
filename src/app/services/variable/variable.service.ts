import { variableRepository } from '../../database';
import { CreateVariableParams as CreateVariableRepoParams } from '../../database/repository/variable/variable.repository.interface';
import { rolesService } from '../roles/roles.service';
import {
  CreateVariableParams,
  DeleteVariableParams,
  GetVariableListObject,
  GetVariableListParams,
  HasAccessParams,
  UpdateVariableParams,
  VariableServiceInterface,
} from './variable.service.interface';

class VariableService implements VariableServiceInterface {
  private readonly repository = variableRepository;

  async hasWriteAccessToVariables({
    roleId,
  }: HasAccessParams): Promise<boolean> {
    return (
      (await rolesService.getModuleRoleInfo({ roleId, module: 'variables' }))
        ?.write || false
    );
  }

  async hasDeleteAccessToVariables({
    roleId,
  }: HasAccessParams): Promise<boolean> {
    return (
      (await rolesService.getModuleRoleInfo({ roleId, module: 'variables' }))
        ?.delete || false
    );
  }

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
}

export const variableService = new VariableService();
