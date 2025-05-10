import {
  CreateVariableParams,
  CreateVariableResult,
  GetVariableListObject,
  GetVariableListParams,
  UpdateVariableParams,
  VariableRepositoryInterface,
  DeleteVariableParams,
} from './variable.repository.interface';
import { variableModal } from '../../modals';
import { VariableSchema } from '../../modals/variable.modal.interface';

class VariableRepository implements VariableRepositoryInterface {
  private modal = variableModal;

  async createVariable({
    overrideUserId,
    environmentId,
    key,
    value,
  }: CreateVariableParams): Promise<CreateVariableResult> {
    const inserObj: VariableSchema = {
      createdAt: new Date(),
      environmentId: environmentId,
      key,
      value,
    };
    if (overrideUserId) inserObj.overrideUserId = overrideUserId;

    const response = await this.modal.insertOne(inserObj);
    if (!response.acknowledged) {
      throw new Error('Failed to insert variable data');
    }

    return { variableId: response.insertedId };
  }

  async getVariableList({
    environmentId,
    userId,
  }: GetVariableListParams): Promise<GetVariableListObject[]> {
    return await this.modal
      .find({
        environmentId,
        overrideUserId: { $in: [userId, undefined] },
      })
      .toArray();
  }

  async updateVariable({
    variableId,
    key,
    value,
  }: UpdateVariableParams): Promise<void> {
    const updateData: {key?: string; value?: string} = {};

    if (key) updateData.key = key;
    if (value) updateData.value = value;

    const response = await this.modal.updateOne(
      {_id: variableId},
      {$set: updateData}
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update variable data');
    }
  }

  async deleteVariable({variableId}: DeleteVariableParams): Promise<void> {
    const response = await this.modal.deleteOne({_id: variableId});
    if (!response.acknowledged || response.deletedCount !== 1) {
      throw new Error('Failed to delete variable data');
    }
  }
}

export const variableRepository = new VariableRepository();
