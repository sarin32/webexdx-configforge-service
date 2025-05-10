import { Document, ObjectId } from 'mongodb';

export interface VariableSchema extends Document {
  key: string;
  value: string;
  environmentId: ObjectId;
  overrideUserId?: ObjectId;
  createdAt: Date;
}
