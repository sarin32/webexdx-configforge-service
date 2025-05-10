import { Document } from 'mongodb';

export interface EmailVerificationPermission {
  send: boolean;
  verify: boolean;
}

export interface ModulePermission {
  read: boolean;
  write: boolean;
  delete: boolean;
}
export interface RolePermissions {
  emailVerification?: EmailVerificationPermission;
  projects?: ModulePermission;
  variables?: ModulePermission;
  environments?: ModulePermission;
}
export interface RolesSchema extends Document {
  name?: string;
  permissions: RolePermissions;
}
