import { AutoMap } from '@automapper/classes'
import { IsInt, IsString, Max, Min } from 'class-validator'
import { UserRpDto } from './users.dto'

export class CreateTodoDto {
  @IsString()
  title: string

  description?: string

  category?: string

  location?: string

  // @IsDate()
  startingDate: string

  performedBy: string
}

export class UpdateTodoDto extends CreateTodoDto {
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number
}

export class TodoRpDto {
  @AutoMap()
  id: string

  @AutoMap()
  title: string

  @AutoMap()
  description?: string

  @AutoMap()
  category: string

  @AutoMap()
  completed: boolean

  @AutoMap()
  location?: string

  @AutoMap()
  progress: number

  @AutoMap()
  startingDate: string

  @AutoMap()
  createdAt: string

  @AutoMap(() => UserRpDto)
  performedBy: UserRpDto

  @AutoMap(() => UserRpDto)
  createdBy: UserRpDto
}
