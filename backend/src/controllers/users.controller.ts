import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, UseAfter } from 'routing-controllers';
import { CreateUserDto } from '@dtos/users.dto';
import { OpenAPI } from 'routing-controllers-openapi';
import { TYPES } from '@/config/types';
import { User } from '@interfaces/users.interface';
import { UserService } from '@interfaces/users.interface';
import { inject } from 'inversify';
import { injectable } from 'inversify';
import { validationMiddleware } from '@middlewares/validation.middleware';

@JsonController()
@injectable()
export class UsersController {
  @inject(TYPES.UserService)
  userService: UserService;

  @Get('/users')
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    console.log('this.userService', this.userService);
    const findAllUsersData: User[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: string) {
    const findOneUserData: User = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/users')
  @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @UseAfter(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createdUser: User = await this.userService.createUser(userData);
    return { data: createdUser, message: 'created' };
  }

  @Put('/users/:id')
  // @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: string, @Body() userData: CreateUserDto) {
    const updatedUser: User[] = await this.userService.updateUser(userId, userData);
    return { data: updatedUser, message: 'updated' };
  }

  @Delete('/users/:id')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: string) {
    const deletedUser: User[] = await this.userService.deleteUser(userId);
    return { data: deletedUser, message: 'deleted' };
  }
}
