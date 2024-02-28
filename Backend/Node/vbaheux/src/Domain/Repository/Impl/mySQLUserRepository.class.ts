import { UUID } from "crypto";
import { db } from "../../../Infra/Database/connect";
import { RowDataPacket } from "mysql2";
import { User } from "../../Model/user.class";
import { UserRepository } from "../user.repository";

export class MySQLUserRepository implements UserRepository {
  async getById(uuid: UUID) {
    const [results] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE uuid = ?",
      [uuid],
    );
    if (results.length > 0) {
      return new User({
        uuid: results[0]["uuid"],
        username: results[0]["username"],
      });
    }
  }
}
