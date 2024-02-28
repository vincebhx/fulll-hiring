import { FleetRepository } from "../../Domain/Repository/fleet.repository";
import { VehicleRepository } from "../../Domain/Repository/vehicle.repository";
import { randomUUID, UUID } from "crypto";
import { Vehicle } from "../../Domain/Model/vehicle.class";

export class RegisterVehicleService {
  private fleetRepository: FleetRepository;
  private vehicleRepository: VehicleRepository;

  constructor(
    fleetRepository: FleetRepository,
    vehicleRepository: VehicleRepository,
  ) {
    this.fleetRepository = fleetRepository;
    this.vehicleRepository = vehicleRepository;
  }

  /**
   * Register a vehicle to a fleet.
   * If the vehicle does not exist, it is created in database.
   * @param fleetId the id of the fleet
   * @param plateNumber the plate number of the new vehicle
   */
  async registerVehicle(fleetId: UUID, plateNumber: string) {
    const fleet = await this.fleetRepository.getById(fleetId);
    if (!fleet) {
      throw new Error("Fleet not found for this id.");
    }
    if (fleet.hasVehicle(plateNumber)) {
      throw new Error("Vehicle already in fleet.");
    }
    let vehicle = await this.vehicleRepository.getByPlateNumber(plateNumber);
    if (!vehicle) {
      vehicle = new Vehicle({
        uuid: randomUUID(),
        plate_number: plateNumber,
        latitude: 0,
        longitude: 0,
      });
      await this.vehicleRepository.persist(vehicle);
    }
    await this.fleetRepository.addVehicleToFleet(fleet, vehicle);
  }
}
