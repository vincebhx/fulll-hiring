import { FleetRepository } from "../../src/Domain/Repository/fleet.repository";
import { Fleet } from "../../src/Domain/Model/fleet.class";
import { UUID } from "crypto";
import { Vehicle } from "../../src/Domain/Model/vehicle.class";

export class TestFleetRepository implements FleetRepository {
  private fleets: Fleet[];
  private fleetVehicles: { fleet: UUID; vehicle: Vehicle }[];

  constructor(
    fleets: Fleet[],
    fleetVehicles: { fleet: UUID; vehicle: Vehicle }[],
  ) {
    this.fleets = fleets;
    this.fleetVehicles = fleetVehicles;
  }

  async getById(uuid: UUID): Promise<Fleet | undefined> {
    const fleet = this.fleets.find((fleet) => fleet.uuid === uuid);
    if (fleet) {
      fleet.vehicles = this.fleetVehicles
        .filter((row) => row.fleet === uuid)
        .map((row) => row.vehicle.plate_number);
    }
    return fleet;
  }

  async persist(fleet: Fleet): Promise<Fleet> {
    this.fleets.push(fleet);
    return fleet;
  }

  async addVehicleToFleet(fleet: Fleet, vehicle: Vehicle): Promise<void> {
    this.fleetVehicles.push({ fleet: fleet.uuid, vehicle: vehicle });
  }
}
