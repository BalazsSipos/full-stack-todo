import * as admin from 'firebase-admin'
import { AppDataSource } from './data-source'
import { CREDENTIALS, NODE_ENV, ORIGIN, PORT } from './config'
import { myContainer } from './config/inversify.config'
import { readdirSync } from 'fs'
import { useContainer, useExpressServer } from 'routing-controllers'
import errorMiddleware from './middlewares/error.middleware'
import express from 'express'
import fs from 'fs'
import path from 'path'

class App {
  public app: express.Application
  public env: string
  public port: string | number

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(Controllers: Function[]) {
    this.app = express()
    useContainer(myContainer)
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000

    this.initializeRoutes(Controllers)
    this.initializeErrorHandling()
    this.initializeDataStore()
    this.initializeFirebaseAuthentication()
  }

  public listen() {
    this.app.listen(this.port, () => {
      const read = fs.readdir(path.join(__dirname, '/entity/'), function (err, files) {
        //handling error
        if (err) {
          return console.log('Unable to scan directory: ' + err)
        }
        //listing all files using forEach
        files.forEach(function (file) {
          // Do whatever you want to do with the file
          console.log(file)
        })
      })
      console.log('read', read)
      console.log(`App listening on the port ${this.port}`)
      console.log('dirname', `${__dirname}/../**/*.entity.{js,ts}`)
      console.log('path', path.join(__dirname, '/entity/*.entity.{js,ts}'))
      console.log('path', path.parse(`${__dirname}/..`))

      const getDirectories = (source) =>
        readdirSync(source, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name)

      console.log('getDirectories', getDirectories(`${__dirname}`))
    })
  }

  public getServer() {
    return this.app
  }

  //   eslint-disable-next-line @typescript-eslint/ban-types
  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: ORIGIN,
        credentials: CREDENTIALS,
      },
      controllers: controllers,
      defaultErrorHandler: false,
    })
  }

  // helper blog post: https://www.tonyvu.co/posts/jwt-authentication-node-js
  private initializeFirebaseAuthentication() {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey:
          process.env.FIREBASE_ADMIN_PRIVATE_KEY[0] === '-'
            ? process.env.FIREBASE_ADMIN_PRIVATE_KEY
            : JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      }),
      // databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private initializeDataStore() {
    AppDataSource.initialize()
      .then(() => {
        // here you can start to work with your database
      })
      .catch((error) => console.log(error))
  }
}

export default App
