import 'reflect-metadata'
import { Controllers } from './config/inversify.config'
import App from 'app'

const app = new App(Controllers)
app.listen()
