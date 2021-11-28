import { User } from '../../entities/User.entity';

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
