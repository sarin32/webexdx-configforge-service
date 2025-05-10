import { NAMESPACE_VARIABLES } from '../../config';
import variablesAutoSchema from './variables.auto-schema';

const autoEncrptionSchema: Record<string, unknown> = {};

autoEncrptionSchema[NAMESPACE_VARIABLES] = variablesAutoSchema;

export default autoEncrptionSchema;
