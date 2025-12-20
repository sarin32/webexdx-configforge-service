import type { Document, ObjectId } from 'mongodb';
import type { ProjectAccessLevel } from '../../config';

export interface ProjectUser {
  userId: ObjectId;
  accessLevel: ProjectAccessLevel;
}

export interface ProjectSchema extends Document {
  name: string;
  createdAt: Date;
  createdBy: ObjectId;
  users: ProjectUser[];
  environmentCount: number;
}
