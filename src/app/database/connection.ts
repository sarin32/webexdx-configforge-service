import { Document, MongoClient } from 'mongodb';
import { DATABASE_SETTINGS } from '../config/config';
import { DATABASE_CONFIG_FORGE, NAMESPACE_KEYVAULT } from '../config';
import autoEncrptionSchema from './auto-encryption-schema';

class Connection {
  private readonly client: MongoClient;

  constructor() {
    const kmsProviders = {
      local: {
        key: DATABASE_SETTINGS.MASTER_KEY,
      },
    };

    this.client = new MongoClient(DATABASE_SETTINGS.URL, {
      // autoEncryption: {
      //   keyVaultNamespace: NAMESPACE_KEYVAULT,
      //   kmsProviders,
      //   schemaMap: autoEncrptionSchema,
      // },
    });
  }

  public async startConnecion() {
    await this.client.connect();
  }

  public getCollection<DocumentT extends Document>(collectionName: string) {
    return this.client
      .db(DATABASE_CONFIG_FORGE)
      .collection<DocumentT>(collectionName);
  }
}

const connection = new Connection();
export default connection;
