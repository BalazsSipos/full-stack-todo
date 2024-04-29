import { CreateUserDto, UserRpDto } from '../dtos/users.dto';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../entity/users.entity';

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserService {
  findAllUser(): Promise<UserRpDto[]>;
  findUserByEmail(email: string): Promise<UserRpDto>;
  findUserEntityByEmail(email: string): Promise<UserEntity>;
  createUser(userData: CreateUserDto): Promise<UserRpDto>;
}

export interface UserController {
  getUsers(req: Request, res: Response, next: NextFunction): Promise<Response<UserRpDto[]>>;
  getUserByEmail(req: Request): Promise<UserRpDto>;
  createUser(req: Request, res: Response): Promise<void>;
}
