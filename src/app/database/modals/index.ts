import { EnvironmentSchema } from './environment.modal.interface';
import { ProjectSchema } from './project.modal.interface';
import { VariableSchema } from './variable.modal.interface';
import { TokenSchema } from './token.modal.interface';
import { RolesSchema } from './roles.modal.interface';

import {
  COLLECTION_ENVIRONMENTS,
  COLLECTION_PROJECTS,
  COLLECTION_VARIABLES,
  COLLECTION_TOKENS,
  COLLECTION_ROLES,
} from '../../config';
import connection from '../connection';

export const environmentModal = connection.getCollection<EnvironmentSchema>(
  COLLECTION_ENVIRONMENTS
);
export const projectModal =
  connection.getCollection<ProjectSchema>(COLLECTION_PROJECTS);
export const variableModal =
  connection.getCollection<VariableSchema>(COLLECTION_VARIABLES);
export const tokenModal =
  connection.getCollection<TokenSchema>(COLLECTION_TOKENS);
export const roleModal =
  connection.getCollection<RolesSchema>(COLLECTION_ROLES);
