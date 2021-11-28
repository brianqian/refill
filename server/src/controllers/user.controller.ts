import { Db, DbRepo } from '../@types/common';
import { User } from '../entities/User.entity';
import { hashPassword } from '../services/auth.service';

class UserController {
  public db: Db;
  public userRepo: DbRepo<User>;

  constructor(db: Db) {
    this.db = db;
    this.userRepo = this.db.em.getRepository(User);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepo.findOne(id);
  }

  async createUser(user: User): Promise<User> {
    const hashedPass = await hashPassword(user.password);
    const newUser = new User({ ...user, password: hashedPass });
    await this.userRepo.persistAndFlush(newUser);
    return newUser;
  }
}

export default UserController;
