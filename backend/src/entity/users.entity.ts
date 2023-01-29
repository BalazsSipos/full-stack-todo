import { AutoMap } from '@automapper/classes'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { IsEmail } from 'class-validator'
import { TodoEntity } from './todos.entity'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  @IsEmail()
  @AutoMap()
  email: string

  @Column()
  @AutoMap()
  name: string

  @Column({ nullable: true })
  password?: string

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
