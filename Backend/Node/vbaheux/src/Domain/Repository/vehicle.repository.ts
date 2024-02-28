import { Vehicle } from "../Model/vehicle.class";

export interface VehicleRepository {
  /**
   * Find a vehicle by plate number
   * @async
   * @param {string} plateNumber the plate number of the vehicle
   * @returns {Vehicle | undefined} the vehicle if found
   */
  getByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;

  /**
   * Insert a new vehicle in database
   * @async
   * @param {Vehicle} vehicle the vehicle to persist
   * @returns {Vehicle} the inserted vehicle
   */
  persist(vehicle: Vehicle): Promise<Vehicle>;

  /**
   * Park a vehicle at a new location
   * @async
   * @param {Vehicle} vehicle the vehicle to park (with its new location)
   * @returns {void}
   */
  park(vehicle: Vehicle): Promise<void>;
}
