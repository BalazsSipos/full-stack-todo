import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { app } from './app';
import { myContainer } from './config/inversify.config';

const server = new InversifyExpressServer(myContainer, null, null, app);
server.build().listen(3000);
