import { IsInt, IsString, Max, Min } from 'class-validator'

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
    @Max(99)
    progress?: number
  }
