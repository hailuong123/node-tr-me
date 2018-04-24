
import { IsNotEmpty, Length } from 'class-validator';
import { IUser } from '../models/user.type';
import { generateObjectId } from 'mongo.cfg';
import * as moment from 'moment';

export class UserRequest {
  @IsNotEmpty({ message: 'user.username.required' })
  @Length(8, 64, { message: 'user.username.length' })
  private username: string;
  private email: string;
  private password: string;

  constructor(body: any) {
    this.username = body.username;
    this.email = body.email;
    this.password = body.password;
  }

  toAddUserModel(): IUser {
    const id = generateObjectId();
    return {
      _id     : id,
      username: this.username.trim().toLocaleLowerCase(),
      email   : this.email.trim().toLocaleLowerCase(),
      password: this.password,
      upd_time: +moment.utc(),
      add_time: +moment.utc()
    };
  }
}
