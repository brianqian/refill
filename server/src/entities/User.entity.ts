import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './Base.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  public firstName: string;

  @Property()
  public lastName: string;

  @Property()
  public email: string;

  @Property()
  public password: string;

  constructor(user: User) {
    super();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
  }
}
