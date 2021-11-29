import { Db, DbRepo } from '../@types/common';
import { User } from '../entities/User.entity';
import { validatePassword } from '../services/auth.service';

class AuthController {
  public db: Db;
  public userRepo: DbRepo<User>;

  constructor(db: Db) {
    this.db = db;
    this.userRepo = this.db.em.getRepository(User);
  }

  async validatePassword(email: string, password: string) {
    const user = await this.userRepo.findOne({ email });
    if (!user) return null;
    const match = await validatePassword(user?.password, password);
    return match;
  }
}

export default AuthController;
