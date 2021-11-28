import { User } from '../entities/User.entity';

export interface GetUser {
  Params: {
    id: string;
  };
  Reply: User | null;
}
export interface CreateUser {
  Body: User;
  Reply: User | null;
}
