import { User } from "../Model/user.class";
import { UUID } from "crypto";

export interface UserRepository {
  /**
   * Find a user by id
   * @async
   * @param uuid the id of the user
   * @returns {User | undefined} the user if found
   */
  getById(uuid: UUID): Promise<User | undefined>;
}
