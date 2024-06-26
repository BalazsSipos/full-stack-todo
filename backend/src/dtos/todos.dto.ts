import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { UserRpDto } from './users.dto';

export class BaseDto {
  populate(data: object) {
    console.log('data', data);
    for (const key in data) {
      console.log('key', key);
      console.log('data[key]', data[key]);
      this[key] = data[key];
    }
  }
}

export class CreateTodoDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  description?: string;

  category?: string;

  location?: string;

  // @IsDate()
  @IsDefined()
  startingDate: string;

  @IsEmail()
  performedByEmail: string;
}

export class UpdateTodoDto extends CreateTodoDto {
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;
}

export class CompleteTodoDto {
  completed: boolean;
}

export class TodoRpDto {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  category: string;

  @AutoMap()
  completed: boolean;

  @AutoMap()
  location?: string;

  @AutoMap()
  progress: number;

  @AutoMap()
  startingDate: string;

  @AutoMap()
  createdAt: string;

  @AutoMap(() => UserRpDto)
  performedBy: UserRpDto;

  @AutoMap(() => UserRpDto)
  createdBy: UserRpDto;
}
