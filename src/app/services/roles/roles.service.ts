import { roleRepository } from '../../database';
import type { RolePermissions } from '../../database/modals/roles.modal.interface';
import type {
  GetRoleInfoParams,
  GetRoleInfoResult,
} from '../../database/repository/role/role.repository.interface';
import type {
  GetModulePermissionInfoParams,
  GetModulePermissionInfoResult,
  RoleServiceInterface,
} from './roles.service.interface';

class RolesService implements RoleServiceInterface {
  repository = roleRepository;

  async getRoleInfo({ roleId }: GetRoleInfoParams): Promise<GetRoleInfoResult> {
    return await this.repository.getRoleInfo({ roleId });
  }

  async getModuleRoleInfo<ModuleNameT extends keyof RolePermissions>({
    module,
    roleId,
  }: GetModulePermissionInfoParams<ModuleNameT>): Promise<
    GetModulePermissionInfoResult<ModuleNameT>
  > {
    return await this.repository.getModuleRoleInfo({ module, roleId });
  }
}

export const rolesService = new RolesService();
