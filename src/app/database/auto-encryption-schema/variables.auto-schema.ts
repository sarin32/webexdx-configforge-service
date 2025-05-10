import { DATABASE_SETTINGS, DETERMINISTIC_ALGORITHM } from '../../config';

export default {
  bsonType: 'object',
  encryptMetadata: {
    keyId: DATABASE_SETTINGS.KEY_BASE64,
  },
  properties: {
    key: {
      // key is field name
      encrypt: {
        bsonType: 'string',
        algorithm: DETERMINISTIC_ALGORITHM,
      },
    },
    value: {
      // value is field name
      encrypt: {
        bsonType: 'string',
        algorithm: DETERMINISTIC_ALGORITHM,
      },
    },
  },
};
