// applevel contstants

export const COLLECTION_ENVIRONMENTS = 'environments';
export const COLLECTION_PROJECTS = 'projects';
export const COLLECTION_VARIABLES = 'variables';
export const COLLECTION_KEYVAULT = '__keyVault';
export const COLLECTION_TOKENS = 'tokens';
export const COLLECTION_ROLES = 'roles';

export const DATABASE_CONFIG_FORGE = 'configForge';
export const DATABASE_ENCRYPTION = 'encryption';

export const NAMESPACE_KEYVAULT = `${DATABASE_ENCRYPTION}.${COLLECTION_KEYVAULT}`;
export const NAMESPACE_VARIABLES = `${DATABASE_CONFIG_FORGE}.${COLLECTION_VARIABLES}`;

export const DETERMINISTIC_ALGORITHM =
  'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic';

export enum ProjectAccessLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
}
