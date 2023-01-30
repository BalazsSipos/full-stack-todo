import { CreateTodoDto, TodoRpDto } from "../dtos/todos.dto"
import { CreateUserDto, UserRpDto } from "../dtos/users.dto"
import { TodoEntity } from "../entity/todos.entity"
import { UserEntity } from "../entity/users.entity"
import { classes } from "@automapper/classes"
import { createMap, createMapper, forMember, mapFrom, typeConverter } from "@automapper/core"

// Create and export the mapper
export const mapper = createMapper({
  strategyInitializer: classes(),
})

createMap(mapper, UserEntity, UserRpDto)
createMap(mapper, CreateUserDto, UserEntity)
createMap(mapper, TodoEntity, TodoRpDto)
createMap(mapper, TodoRpDto, TodoEntity)
createMap(
  mapper,
  CreateTodoDto,
  TodoEntity,
  forMember(
    (d) => d.completed,
    mapFrom(() => false)
  ),
  forMember(
    (d) => d.progress,
    mapFrom(() => 0)
  ),
  typeConverter(String, Date, (date) => new Date(date))
)
