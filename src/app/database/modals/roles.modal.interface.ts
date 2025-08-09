import { Document } from 'mongodb';

export interface ModulePermission {
  read: boolean;
  write: boolean;
  delete: boolean;
}
export interface RolePermissions {
  projects?: ModulePermission;
  variables?: ModulePermission;
  environments?: ModulePermission;
}
export interface RolesSchema extends Document {
  name?: string;
  permissions: RolePermissions;
}
