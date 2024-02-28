import { LocationInterface, VehicleInterface } from "./entity.interface";
import { UUID } from "crypto";

export class Vehicle implements VehicleInterface {
  uuid: UUID;
  plate_number: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  fleets: string[];

  constructor(vehicle: VehicleInterface) {
    this.uuid = vehicle.uuid;
    this.plate_number = vehicle.plate_number;
    this.latitude = vehicle.latitude;
    this.longitude = vehicle.longitude;
    this.altitude = vehicle.altitude;
    this.fleets = vehicle.fleets || [];
  }

  /**
   * Check if a vehicle is already at a given location.
   * @param location the location to check
   */
  isAlreadyAt(location: LocationInterface) {
    return (
      this.latitude === location.latitude &&
      this.longitude === location.longitude &&
      this.altitude === location.altitude
    );
  }

  /**
   * Check if a vehicle is part of a given fleet.
   * @param fleetId the id of the fleet to check
   */
  isPartOfFleet(fleetId: string) {
    return this.fleets.includes(fleetId);
  }

  /**
   * Set a new location for this vehicle.
   * @param location the new location
   */
  setLocation(location: LocationInterface) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.altitude = location.altitude;
  }
}
