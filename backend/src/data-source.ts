import 'reflect-metadata'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config'
import { createConnection } from 'typeorm'
// import { TodoEntity } from './entity/todos.entity'
// import { UserEntity } from './entity/users.entity'

// export const AppDataSource = new DataSource({
export const AppDataSource = await createConnection({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  // entities: [UserEntity, TodoEntity],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // entities: ['./**/*.entity{.js}'],
  subscribers: [],
  migrations: [],
})
