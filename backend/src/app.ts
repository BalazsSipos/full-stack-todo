import 'reflect-metadata';
import { CREDENTIALS, NODE_ENV, ORIGIN, PORT } from '@config';
import { useExpressServer } from 'routing-controllers';
import errorMiddleware from '@middlewares/error.middleware';
import express from 'express';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(Controllers: Function[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeRoutes(Controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }


  // eslint-disable-next-line @typescript-eslint/ban-types
  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: ORIGIN,
        credentials: CREDENTIALS,
      },
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
