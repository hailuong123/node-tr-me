
import { Router, Response, Request, NextFunction } from 'express';

const router = Router({ mergeParams: true });

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('layouts/main', {
    title: 'Home 1 ',
    content: 'This is Homepage'
  });
});

export let home = router;