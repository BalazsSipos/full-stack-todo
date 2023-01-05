import { UsersController } from '@controllers/users.controller';
import App from '@/app';

const app = new App([UsersController]);
app.listen();
