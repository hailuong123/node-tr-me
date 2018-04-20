import { Express } from 'express';

export let initModules = (app: Express) => {
  app.use('/', require('./home'));
};