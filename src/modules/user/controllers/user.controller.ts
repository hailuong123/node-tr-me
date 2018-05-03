import { isValid } from 'validator.lib';
import * as passport from 'passport';
import { Router, Request, Response } from 'express';
import { UserRequest } from '../payload/user.payload';
import { addUser, findOne } from '../models/user.store';
import { UserLoginRequest } from '../payload/user.login.payload';
const router = Router({ mergeParams: true });

router.get('/login', (req: Request, res: Response) => {
  res.render('signIn', {
    title: 'Login'
  });
});

router.post('/login', (req: Request, res: Response) => {
  isValid(new UserLoginRequest(req.body))
    .map(user => user.getData())
    .flatMap(user => findOne(user))
    .subscribe(iUser => {
      if (!iUser) {
        const { body } = req;
        res.render('signin', {
          title: 'Register',
          data: body,
          error_msg: 'Email or Password incorrect.'
        });
      } else {
        delete iUser.password;
        delete iUser.upd_time;
        delete iUser.add_time;

        res.render('signin', {
          title: 'Register',
          success_msg: 'Login successfully'
        });
      }
    }, (err: any) => {
      const { body } = req;
      res.render('signin', {
        title: 'Register',
        data: body,
        error_msg: err
      });
    });
});

router.get('/register', (req: Request, res: Response) => {
  res.render('signup', {
    title: 'Register'
  });
}).post('/register', (req: Request, res: Response) => {
  isValid(new UserRequest(req.body))
    .map(user => user.toAddUserModel())
    .flatMap(isUser => addUser(isUser))
    .subscribe(iUser => {
      res.render('signin', {
        title: 'Login',
        success_msg: 'Register is successfully.'
      });
    }, (err) => {
      const { body } = req;
      res.render('signup', {
        title: 'Register',
        data: body,
        error_msg: err
      });
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3010/',
    failureRedirect: 'http://localhost:3010/user/login',
    session: false,
  })
);

export let user = router;
