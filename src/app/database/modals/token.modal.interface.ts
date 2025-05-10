import { Document, ObjectId } from 'mongodb';

export interface TokenSchema extends Document {
  name: string;
  token: string;
  environmentId: ObjectId;
  userId?: ObjectId;
  isActive: boolean;
  expiresOn: Date;
  createdAt: Date;
}
