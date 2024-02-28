import { UUID } from "crypto";
import { User } from "./user.class";

export interface EntityInterface {
  uuid: UUID;
}

export interface UserInterface extends EntityInterface {
  username: string;
}

export interface FleetInterface extends EntityInterface {
  owner?: User;
  vehicles?: string[]; //The fleet's vehicles plate numbers
}

export interface LocationInterface {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface VehicleInterface extends EntityInterface, LocationInterface {
  plate_number: string;
  fleets?: string[];
}
