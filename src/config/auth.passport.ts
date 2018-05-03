import { PassportStatic } from 'passport';
const FacebookStrategy = require('passport-facebook').Strategy;
import { isValid } from 'validator.lib';
import { User, addUser } from '../modules/user/models/user.store';
import { UserAuthRequest } from '../modules/user/payload/user.login.payload';

const configAuth = require('./auth.cfg');

module.exports = (passport: PassportStatic) => {
  passport.serializeUser((user: any, done: Function) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileURL: configAuth.facebookAuth.profileURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, (token: string, refreshToken: string, profile: any, done: Function) => {
    process.nextTick(() => {
      User.findOne({ '_id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(undefined, user);
        } else {
          isValid(new UserAuthRequest(profile))
            .map(user => user.getDataAuth())
            .flatMap(user => addUser(user))
            .subscribe(iUser => {
              return done(undefined, iUser);
            });
        }
      });
    });
  }));
};
