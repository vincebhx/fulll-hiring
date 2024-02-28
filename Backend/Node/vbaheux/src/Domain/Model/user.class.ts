import { UserInterface } from "./entity.interface";
import { UUID } from "crypto";

export class User implements UserInterface {
  uuid: UUID;
  username: string;

  constructor(user: UserInterface) {
    this.uuid = user.uuid;
    this.username = user.username;
  }
}
