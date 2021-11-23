import { User } from '../entities/User.entity';
import { Db, DbRepo } from '../types/common';

class UserController {
  public db: Db;

  public repo: DbRepo<User>;

  constructor(db: Db) {
    this.db = db;
    this.repo = this.db.em.getRepository(User);
  }

  async getUser(id: string) {
    this.repo.findOne(id);
  }

  async createUser(user: User) {
    const newUser = new User(user);
    await this.repo.persistAndFlush(newUser);
  }
}

export default UserController;
