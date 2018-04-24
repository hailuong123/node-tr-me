import { isValid } from 'validator.lib';
import { Router, Request, Response } from 'express';
import { UserRequest } from '../payload/user.payload';
import { addUser } from '../models/user.store';
const router = Router({ mergeParams: true });

router.get('/login', (req: Request, res: Response) => {
  res.render('signIn', {
    title: 'Login'
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
      res.render('signup', {
        title: 'Register',
        error_msg: err
      });
    });
});

export let user = router;
