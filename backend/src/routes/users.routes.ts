import { TYPES } from '../config/types';
import { UserController } from '../interfaces/users.interface';
import { myContainer } from '../config/inversify.config';
import express from 'express';

const router = express.Router();

const userController = myContainer.get<UserController>(TYPES.UserController);

router.get('/', userController.getUsers);
router.get('/:email', userController.getUserById);
router.post('/', userController.createUser);

export { router as userRoutes };
