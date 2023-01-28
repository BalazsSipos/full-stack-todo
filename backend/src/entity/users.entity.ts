import { AutoMap } from '@automapper/classes'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail } from 'class-validator'
import { TodoEntity } from './todos.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number

  @Column({ unique: true })
  @IsEmail()
  @AutoMap()
  email: string

  @Column()
  @AutoMap()
  name: string

  @Column()
  password: string

  @Column({ nullable: true })
  @AutoMap()
  image?: string

  @OneToMany(() => TodoEntity, (todo) => todo.createdBy)
  @AutoMap()
  createdTodos: TodoEntity[]

  @OneToMany(() => TodoEntity, (todo) => todo.performedBy)
  @AutoMap()
  performedTodos: TodoEntity[]
}
