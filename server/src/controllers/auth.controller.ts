import { Db, DbRepo } from '../@types/common';
import { User } from '../entities/User.entity';

class AuthController {
  public db: Db;

  public repo: DbRepo<User>;

  constructor(db: Db) {
    this.db = db;
    this.repo = this.db.em.getRepository(User);
  }
}

export default AuthController;
