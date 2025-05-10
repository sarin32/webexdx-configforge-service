import { Document, ObjectId } from 'mongodb';

export interface UserSchema extends Document {
  name: string;
  roleId: ObjectId;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  isVerified: boolean;
}
