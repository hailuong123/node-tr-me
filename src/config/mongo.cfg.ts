import * as fs from 'fs';
import * as glob from 'glob';
import { MongoClient, MongoClientOptions, ObjectID } from 'mongodb';

let dbInstance: MongoClient;

/**
 * create DB client connection
 */
export let connectDB = async (
  mongoUri: string,
  isProduction: boolean = false,
  certFileUri?: string
) => {
  let mongoOptions: MongoClientOptions = {};

  if (certFileUri) {
    mongoOptions = {
      ssl: true,
      sslValidate: true,
      sslCA: [fs.readFileSync(certFileUri)],
      poolSize: 1
    };
  }

  if (isProduction === false) {
    mongoOptions = {};
  }

  try {
    dbInstance = await MongoClient.connect(mongoUri, mongoOptions);
    console.log('Connected to db with uri: %s', mongoUri);
  } catch (error) {
    console.error('Failed to connect to mongoDB', error);
  }
};

/**
 * get DB instance for further using
 */
export let getDbInstance = (): MongoClient => {
  if (!dbInstance) {
    throw 'Database is not yet instantiated';
  }
  return dbInstance;
};

export let generateObjectId = (): ObjectID => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return new ObjectID(timestamp);
};

export let indexDb = async (isIndexing: boolean) => {
  if (!isIndexing) {
    return;
  }
  let indexInstances: any[] = [];
  glob('**/*.type.ts', {}, (err, files) => {
    files.forEach(file => {
      indexInstances = indexInstances.concat(require(file.replace('.ts', '').replace('src', '..')).Indexs || []);
    });
    const tasks = [] as any;
    indexInstances.forEach((item: any) => {
      const collection = getDbInstance().db().collection(`${process.env.MONGO_TABLE_PREFIX}${item.collection}`);
      tasks.push(collection.dropIndexes((err: any, result: any) => {
        if (err) {
          console.error(err);
        }
        collection.createIndexes(item.indexes);
      }));
    });
    Promise.all(tasks).then(result => {
      console.log('INDEX DB RESULT');
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
};