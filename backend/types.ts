import {ObjectId} from 'mongoose';

export interface UserFields {
  _id: ObjectId;
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}