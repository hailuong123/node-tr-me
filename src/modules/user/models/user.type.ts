
import { ObjectID } from 'mongodb';

export interface IUser {
  _id: ObjectID;
  username: string;
  email: string;
  password: string;
  upd_time?: number;
  add_time?: number;
}
