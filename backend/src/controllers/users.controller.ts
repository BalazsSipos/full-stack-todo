import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from 'routing-controllers'
import { CreateUserDto, UserRpDto } from '@dtos/users.dto'
import { OpenAPI } from 'routing-controllers-openapi'
import { TYPES } from '@/config/types'
import { UserService } from '@interfaces/users.interface'
import { inject } from 'inversify'
import { injectable } from 'inversify'

@JsonController()
@injectable()
export class UsersController {
  @inject(TYPES.UserService)
  userService: UserService

  @Get('/users')
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    const findAllUsersData: UserRpDto[] = await this.userService.findAllUser()
    return findAllUsersData
  }

  @Get('/users/:email')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('email') email: string) {
    const findOneUserData: UserRpDto = await this.userService.findUserByEmail(email)
    return { data: findOneUserData, message: 'findOne' }
  }

  @Post('/users')
  @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  // @UseAfter(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createdUser: UserRpDto = await this.userService.createUser(userData)
    return { data: createdUser, message: 'created' }
  }

  @Put('/users/:id')
  // @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: string, @Body() userData: CreateUserDto) {
    const updatedUser: UserRpDto[] = await this.userService.updateUser(userId, userData)
    return { data: updatedUser, message: 'updated' }
  }

  @Delete('/users/:id')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: string) {
    const deletedUser: UserRpDto[] = await this.userService.deleteUser(userId)
    return { data: deletedUser, message: 'deleted' }
  }
}
