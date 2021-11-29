import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './Base.entity';

@Entity()
@Unique({ properties: ['email'] })
export class User extends BaseEntity {
  @Property()
  public firstName: string;

  @Property()
  public lastName: string;

  @Property()
  public email: string;

  @Property({ hidden: true })
  public password: string;

  constructor(user: User) {
    super();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
  }
}
