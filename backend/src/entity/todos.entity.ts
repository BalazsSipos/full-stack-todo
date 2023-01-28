import { AutoMap } from '@automapper/classes'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsDate, IsInt, Max, Min } from 'class-validator'
import { UserEntity } from './users.entity'

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number

  @Column()
  @AutoMap()
  title: string

  @Column('text', { nullable: true })
  @AutoMap()
  description?: string

  @Column({ default: 'other' })
  @AutoMap()
  category: string

  @Column({ default: false })
  @AutoMap()
  completed: boolean

  @Column({ nullable: true })
  @AutoMap()
  location?: string

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  @Max(100)
  @AutoMap()
  progress: number

  @Column()
  @IsDate()
  @AutoMap()
  startingDate: Date

  @Column()
  @CreateDateColumn()
  @AutoMap()
  createdAt: Date

  // @Column()
  @ManyToOne(() => UserEntity, (user) => user.createdTodos)
  @AutoMap(() => UserEntity)
  createdBy: UserEntity

  // @Column()
  @ManyToOne(() => UserEntity, (user) => user.performedTodos)
  @AutoMap(() => UserEntity)
  performedBy: UserEntity
}
