import { Document, ObjectId } from 'mongodb';

export interface EnvironmentSchema extends Document {
  name: string;
  projectId: ObjectId;
  createdAt: Date;
  createdBy: ObjectId;
}
