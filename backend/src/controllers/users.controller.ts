import { Request, Response } from 'express';
import { TYPES } from '../config/types';
import { UserController, UserService } from '../interfaces/users.interface';
import { UserRpDto } from '../dtos/users.dto';
import { inject, injectable } from 'inversify';

@injectable()
export class UserControllerImpl implements UserController {
  // @inject(TYPES.UserService)
  // userService: UserService;
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  public getUsers = async (req: Request, res: Response): Promise<Response<UserRpDto[]>> => {
    const users = await this.userService.findAllUser();
    const data = res.status(200).json(users);
    return data;
  };

  public getUserByEmail = async (req: Request) => {
    const email = req.params.email;
    // const findOneUserData: UserRpDto = await this.userService.findUserByEmail(email);
    return await this.userService.findUserByEmail(email);
    // return { data: findOneUserData, message: 'findOne' };
  };

  // @HttpCode(201)
  // @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  // @UseAfter(validationMiddleware(CreateUserDto, 'body'))
  public createUser = async (req: Request, res: Response) => {
    try {
      await this.userService.createUser(req.body);
      res.sendStatus(201);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}
