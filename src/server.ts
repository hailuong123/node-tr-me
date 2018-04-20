
/* LOAD CONFIG */
require('dotenv').config({ path: '.env' });
const del = /^win/.test(process.platform) ? ';' : ':';

process.env.NODE_PATH = __dirname + `/config${del}` + __dirname + '/lib';
require('module').Module._initPaths();

/*
  Module dependencies
*/
import * as express from 'express';
import { connectDB } from 'mongo.cfg';
import { initExpress, initErrorRoutes } from 'express.cfg';
import { initModules } from './modules';
const dbUri = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;

const app = express();

const start = async () => {
  await connectDB(dbUri);

  initExpress(app);

  initErrorRoutes(app);

  initModules(app);

  app.listen(process.env.NODE_PORT, () => {
    console.log('Running localhost:%d', process.env.NODE_PORT);
  });
};

start().catch(console.error);

export let server = app;

