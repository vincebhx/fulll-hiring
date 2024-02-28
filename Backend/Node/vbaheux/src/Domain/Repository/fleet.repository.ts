import { UUID } from "crypto";
import { Fleet } from "../Model/fleet.class";
import { Vehicle } from "../Model/vehicle.class";

export interface FleetRepository {
  /**
   * Find a fleet by id
   * @async
   * @param {UUID} uuid the id of the fleet
   * @returns {Fleet | undefined} Fleet object if found, otherwise undefined
   */
  getById(uuid: UUID): Promise<Fleet | undefined>;

  /**
   * Insert a fleet in database
   * @async
   * @param {Fleet} fleet the fleet to persist
   * @returns {Fleet} the created fleet object
   */
  persist(fleet: Fleet): Promise<Fleet>;

  /**
   * Add a vehicle to an existing fleet
   * @async
   * @param {Fleet} fleet the fleet to update
   * @param {Vehicle} vehicle the vehicle to add to the fleet
   * @returns {void}
   */
  addVehicleToFleet(fleet: Fleet, vehicle: Vehicle): Promise<void>;
}
