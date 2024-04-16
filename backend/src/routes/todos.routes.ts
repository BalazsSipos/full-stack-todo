import { TYPES } from '../config/types';
import { TodoController } from '../interfaces/todos.interface';
import { myContainer } from '../config/inversify.config';
import authenticateJWT from '../middlewares/authentication.middleware';
import express from 'express';

const router = express.Router();

const todoController = myContainer.get<TodoController>(TYPES.TodoController);

router.get('/', authenticateJWT, todoController.getTodos);
router.get('/:tid', authenticateJWT, todoController.getTodoById);
router.post('/', authenticateJWT, todoController.createTodo);
router.patch('/:tid', authenticateJWT, todoController.updateTodo);
router.delete('/:tid', authenticateJWT, todoController.deleteTodo);

export { router as todoRoutes };
