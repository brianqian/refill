import { User } from '../entities/User.entity';
import { Db, DbRepo } from '../@types';
import { hashPassword } from '../services/auth.service';

class UserController {
  public db: Db;

  public repo: DbRepo<User>;

  constructor(db: Db) {
    this.db = db;
    this.repo = this.db.em.getRepository(User);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repo.findOne(id);
  }

  async createUser(user: User): Promise<User> {
    const hashedPass = await hashPassword(user.password);
    const newUser = new User({ ...user, password: hashedPass });
    await this.repo.persistAndFlush(newUser);
    return newUser;
  }
}

export default UserController;
