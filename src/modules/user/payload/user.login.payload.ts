import { IsNotEmpty } from 'class-validator';
import { ILogin, IAuth } from './user.login.type';

export class UserLoginRequest {
  @IsNotEmpty({ message: 'user.email.required' })
  private email: string;
  @IsNotEmpty({ message: 'user.password.required' })
  private password: string;

  constructor(body: any) {
    this.email    = body.email;
    this.password = body.password;
  }

  getData(): ILogin {
    return {
      email: this.email.toLocaleLowerCase(),
      password: this.password
    };
  }
}

export class UserAuthRequest {
  private _id: string;
  private email: string;
  private name: string;
  private picture?: any;

  constructor(body: any) {
    this._id       = body.id;
    this.email    = body.emails[0].value;
    this.name     = body.displayName;
    this.picture  = body.picture;
  }

  getDataAuth(): IAuth {
    return {
      _id: this._id,
      name: this.name,
      email: this.email.toLocaleLowerCase(),
      picture: this.picture
    };
  }
}
