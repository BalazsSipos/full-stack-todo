import { TYPES } from '../config/types';
import { UserController } from '../interfaces/users.interface';
import { myContainer } from '../config/inversify.config';
import authenticateJWT from '../middlewares/authentication.middleware';
import express from 'express';

const router = express.Router();

const userController = myContainer.get<UserController>(TYPES.UserController);

router.get('/', userController.getUsers);
router.get('/:email', authenticateJWT, userController.getUserByEmail);
router.post('/', userController.createUser);

export { router as userRoutes };
