import 'reflect-metadata';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, SSL } from './config';
import { DataSource } from 'typeorm';
import { TodoEntity } from './entity/todos.entity';
import { UserEntity } from './entity/users.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [UserEntity, TodoEntity],
  // entities: [__dirname + '/**/*.entity.{js,ts}'],
  // entities: [path.join(__dirname, '/entity/*.entity.{js,ts}')],
  // entities: ['./**/*.entity.{js,ts}'],
  subscribers: [],
  migrations: [],
  ssl: SSL,
});
