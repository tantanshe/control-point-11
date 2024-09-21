import {ObjectId} from 'mongoose';

export interface UserFields {
  _id: ObjectId;
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  seller: string;
}