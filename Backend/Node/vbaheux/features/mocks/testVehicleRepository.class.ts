import { VehicleRepository } from "../../src/Domain/Repository/vehicle.repository";
import { Vehicle } from "../../src/Domain/Model/vehicle.class";
import { UUID } from "crypto";

export class TestVehicleRepository implements VehicleRepository {
  private vehicles: Vehicle[];
  private fleetVehicles: { fleet: UUID; vehicle: Vehicle }[];

  constructor(
    vehicles: Vehicle[],
    fleetVehicles: { fleet: UUID; vehicle: Vehicle }[],
  ) {
    this.vehicles = vehicles;
    this.fleetVehicles = fleetVehicles;
  }

  async getByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle.plate_number === plateNumber,
    );
    if (vehicle) {
      vehicle.fleets = this.fleetVehicles
        .filter((row) => row.vehicle.uuid === vehicle.uuid)
        .map((row) => row.fleet);
    }
    return vehicle;
  }

  async persist(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicles.push(vehicle);
    return vehicle;
  }

  async park(vehicle: Vehicle): Promise<void> {
    const index = this.vehicles.findIndex(
      (row) => row.plate_number === vehicle.plate_number,
    );
    if (index > -1) {
      this.vehicles[index] = vehicle;
    }
  }
}
