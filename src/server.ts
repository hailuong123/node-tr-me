
/* LOAD CONFIG */
require('dotenv').config({ path: '.env' });
const del = /^win/.test(process.platform) ? ';' : ':';

process.env.NODE_PATH = __dirname + `/config${del}` + __dirname + '/lib';
require('module').Module._initPaths();

/*
  Module dependencies
*/
import * as express from 'express';
import * as passport from 'passport';
import * as http from 'http';
import * as https from 'https';
import { readFileSync } from 'fs';
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

  require('./config/auth.passport')(passport);

  const key = readFileSync('key/server-key.pem');
  const csr = readFileSync('key/server-csr.pem');
  const cert = readFileSync('key/server-cert.pem');
  const options = {
    key: key,
    cert: cert,
    csr: csr
  };

  http.createServer(app).listen(process.env.NODE_PORT, () => {
    console.log('Running localhost:%d', process.env.NODE_PORT);
  });

  https.createServer(options, app).listen(process.env.NODE_PORT_SSL, () => {
    console.log('Running https://localhost:%d', process.env.NODE_PORT_SSL);
  });
};

start().catch(console.error);

export let server = app;

