import UserController from '../../controllers/user.controller';
import { User } from '../../entities/User.entity';

export interface IUserRoutes {
  controller: UserController;
  prefix: string;
}
export interface GetUser {
  Params: {
    id: string;
  };
  Reply: { user: User | null };
}
export interface CreateUser {
  Body: User;
  Reply: { user: User | null };
}
