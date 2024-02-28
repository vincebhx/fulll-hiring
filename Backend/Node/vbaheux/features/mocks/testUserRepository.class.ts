import { UserRepository } from "../../src/Domain/Repository/user.repository";
import { User } from "../../src/Domain/Model/user.class";
import { UUID } from "crypto";

export class TestUserRepository implements UserRepository {
  private users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async getById(uuid: UUID): Promise<User | undefined> {
    return this.users.find((user) => user.uuid === uuid);
  }
}
