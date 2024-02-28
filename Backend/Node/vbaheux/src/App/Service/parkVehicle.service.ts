import { LocationInterface } from "../../Domain/Model/entity.interface";
import { VehicleRepository } from "../../Domain/Repository/vehicle.repository";
import { MySQLVehicleRepository } from "../../Domain/Repository/Impl/mySQLVehicleRepository.class";

export class ParkVehicleService {
  private vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  /**
   * Park a vehicle at a new location.
   * @param fleetId the current fleet
   * @param plateNumber the plate number of the vehicle
   * @param location the new location of the vehicle
   */
  async parkVehicle(
    fleetId: string,
    plateNumber: string,
    location: LocationInterface,
  ) {
    const vehicle = await this.vehicleRepository.getByPlateNumber(plateNumber);
    if (!vehicle) {
      throw new Error("Vehicle not found for this plate number.");
    }
    if (!vehicle.isPartOfFleet(fleetId)) {
      throw new Error("Vehicle not found for this fleet id.");
    }
    if (vehicle.isAlreadyAt(location)) {
      throw new Error("Vehicle already parked at this location.");
    }
    vehicle.setLocation(location);
    await this.vehicleRepository.park(vehicle);
  }
}
