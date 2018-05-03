import { IUserLocal, IUserAuth } from './user.type';
import { Observable } from 'rxjs';
import { DbError } from 'error.lib';
import { getDbInstance as db } from 'mongo.cfg';
import { InsertOneWriteOpResult, ObjectID } from 'mongodb';

export let User = db().collection(`${process.env.MONGO_TABLE_PREFIX}user`);

export let addUser = (user: IUserLocal|IUserAuth): Observable<IUserLocal|IUserAuth> => {
  const result = User.insertOne(user, { forceServerObjectId: true });
  return Observable
          .fromPromise(result)
          .single()
          .map((data: InsertOneWriteOpResult) => {
            if (data.result.ok !== 1) {
              throw new DbError('user.add.failed');
            }
            return data.ops[0];
          })
          .catch((err) => {
            const error = err.toString();
            if (error.indexOf('E11000 duplicate key error collection: bacoor-v1.baco_user index: email_1 dup key') > 0)
                throw new DbError('user.email.existed');
            if (error
                .indexOf('E11000 duplicate key error collection: bacoor-v1.baco_user index: username_1 dup key') > 0)
                throw new DbError('user.username.existed');
            return Observable.throw(err);
          });
};

export let findOne = (condition: any) => {
  if (condition._id) condition._id = new ObjectID(condition._id);
  const result = User.findOne(condition);
  return Observable
          .fromPromise(result)
          .single();
};
