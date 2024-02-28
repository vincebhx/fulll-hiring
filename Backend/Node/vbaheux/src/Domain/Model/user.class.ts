import { UserInterface } from "./entity.interface";
import { UUID } from "crypto";
import { RowDataPacket } from "mysql2/index";

export class User implements UserInterface {
  uuid: UUID;
  username: string;

  constructor(user: UserInterface) {
    this.uuid = user.uuid;
    this.username = user.username;
  }
}
