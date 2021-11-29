import AuthController from '../../controllers/auth.controller';

export interface IAuthRoutes {
  controller: AuthController;
  prefix: string;
}
export interface Login {
  Body: {
    email: string;
    password: string;
  };
}
