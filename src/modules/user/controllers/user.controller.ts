import { Router, Request, Response, NextFunction } from 'express';

const router = Router({ mergeParams: true });

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.render('signIn', {
    title: 'Login'
  });
});

router.get('/register', (req: Request, res: Response, next: NextFunction) => {
  res.render('', {
    title: 'Register'
  });
});

export let user = router;
