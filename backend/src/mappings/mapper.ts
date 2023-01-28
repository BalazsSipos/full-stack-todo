import { CreateUserDto, UserRpDto } from '@/dtos/users.dto'
import { TodoEntity } from '@/entity/todos.entity'
import { TodoRpDto } from '@/dtos/todos.dto'
import { UserEntity } from '@/entity/users.entity'
import { classes } from '@automapper/classes'
import { createMap, createMapper, typeConverter } from '@automapper/core'

// Create and export the mapper
export const mapper = createMapper({
  strategyInitializer: classes(),
})

createMap(mapper, UserEntity, UserRpDto)
createMap(mapper, CreateUserDto, UserEntity)
createMap(
  mapper,
  TodoEntity,
  TodoRpDto,
  typeConverter(Date, String, (date) => date.toDateString())
)
