import {
  COLLECTION_ENVIRONMENTS,
  COLLECTION_PROJECTS,
  COLLECTION_ROLES,
  COLLECTION_TOKENS,
  COLLECTION_VARIABLES,
} from '../../config';
import connection from '../connection';
import type { EnvironmentSchema } from './environment.modal.interface';
import type { ProjectSchema } from './project.modal.interface';
import type { RolesSchema } from './roles.modal.interface';
import type { TokenSchema } from './token.modal.interface';
import type { VariableSchema } from './variable.modal.interface';

export const environmentModal = connection.getCollection<EnvironmentSchema>(
  COLLECTION_ENVIRONMENTS,
);
export const projectModal =
  connection.getCollection<ProjectSchema>(COLLECTION_PROJECTS);
export const variableModal =
  connection.getCollection<VariableSchema>(COLLECTION_VARIABLES);
export const tokenModal =
  connection.getCollection<TokenSchema>(COLLECTION_TOKENS);
export const roleModal =
  connection.getCollection<RolesSchema>(COLLECTION_ROLES);
