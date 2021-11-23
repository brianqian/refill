import { Db } from '../types/common';
import UserController from './user.controller';

class BaseController {
  protected constructor(public db: Db) {}

  public static build(db: Db): BaseController {
    return new BaseController(db);
  }

  public User = new UserController(this.db);
}

export default BaseController;
