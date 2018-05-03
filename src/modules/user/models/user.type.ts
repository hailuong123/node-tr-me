
import { ObjectID } from 'mongodb';

export interface IUserLocal {
  _id: ObjectID;
  username: string;
  email: string;
  password: string;
  upd_time?: number;
  add_time?: number;
}

export interface IUserAuth {
  _id: string;
  name: string;
  email: string;
  birthday?: string;
  gender?: string;
  upd_time?: number;
  add_time?: number;
}
