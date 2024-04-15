import * as express from 'express';
import { TYPES } from '../config/types';
import { UserRpDto } from '../dtos/users.dto';
import { UserService } from '../interfaces/users.interface';
import { controller, httpGet, httpPost, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';

@controller('/users')
export class UsersController {
  // @inject(TYPES.UserService)
  // userService: UserService;
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  async getUsers() {
    console.log('getUsers');
    return await this.userService.findAllUser();
  }

  @httpGet('/:email')
  async getUserById(@requestParam('email') email: string) {
    const findOneUserData: UserRpDto = await this.userService.findUserByEmail(email);
    return { data: findOneUserData, message: 'findOne' };
  }

  @httpPost('/')
  // @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  // @UseAfter(validationMiddleware(CreateUserDto, 'body'))
  async createUser(@request() req: express.Request, @response() res: express.Response) {
    try {
      await this.userService.createUser(req.body);
      res.sendStatus(201);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
