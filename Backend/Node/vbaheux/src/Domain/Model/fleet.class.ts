import { FleetInterface } from "./entity.interface";
import { UUID } from "crypto";
import { User } from "./user.class";

export class Fleet implements FleetInterface {
  uuid: UUID;
  owner?: User;
  vehicles: string[];

  constructor(fleet: FleetInterface) {
    this.uuid = fleet.uuid;
    this.owner = fleet.owner;
    this.vehicles = fleet.vehicles || [];
  }

  /**
   * Check if a fleet already has a specific vehicle.
   * @param plateNumber the plate number of the vehicle to check
   */
  hasVehicle(plateNumber: string) {
    return this.vehicles.includes(plateNumber);
  }
}
