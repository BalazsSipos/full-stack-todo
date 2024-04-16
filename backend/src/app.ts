import * as admin from 'firebase-admin';
import { AppDataSource } from './data-source';
import errorMiddleware from './middlewares/error.middleware';
import express from 'express';

import * as bodyParser from 'body-parser';

import './controllers/todos.controller';
import './controllers/users.controller';
import { userRoutes } from './routes/users.routes';

export const app = express();
initializeDataStore();
initializeFirebaseAuthentication;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/users', userRoutes);

app.use(errorMiddleware);

function initializeFirebaseAuthentication() {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey:
        // process.env.FIREBASE_ADMIN_PRIVATE_KEY[0] === '-'
        //   ? process.env.FIREBASE_ADMIN_PRIVATE_KEY
        //   : JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
        process.env.FIREBASE_ADMIN_PRIVATE_KEY
          ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, '\n')
          : undefined,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

function initializeDataStore() {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
}
