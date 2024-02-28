import { db } from "../../../Infra/Database/connect";
import { RowDataPacket } from "mysql2";
import { Vehicle } from "../../Model/vehicle.class";
import { VehicleRepository } from "../vehicle.repository";

export class MySQLVehicleRepository implements VehicleRepository {
  constructor() {}

  async getByPlateNumber(plateNumber: string) {
    const [results] = await db.query<RowDataPacket[]>(
      `SELECT uuid, plate_number, latitude, longitude, altitude, fleet_id FROM vehicles
       LEFT JOIN fleet_vehicles ON fleet_vehicles.vehicle_id = vehicles.uuid
       WHERE plate_number = ?`,
      [plateNumber],
    );
    if (results.length > 0) {
      return new Vehicle({
        uuid: results[0]["uuid"],
        plate_number: results[0]["plate_number"],
        latitude: results[0]["latitude"],
        longitude: results[0]["longitude"],
        altitude: results[0]["altitude"],
        fleets: results
          .map((row) => row["fleet_id"])
          .filter((fleet) => !!fleet),
      });
    }
  }

  async persist(vehicle: Vehicle) {
    await db.query(
      "INSERT INTO vehicles(uuid, plate_number, latitude, longitude) VALUES (?, ?, ?, ?)",
      [vehicle.uuid, vehicle.plate_number, vehicle.latitude, vehicle.longitude],
    );
    return vehicle;
  }

  async park(vehicle: Vehicle) {
    await db.query(
      "UPDATE vehicles SET latitude = ?, longitude = ?, altitude = ? WHERE uuid= ?",
      [
        vehicle.latitude,
        vehicle.longitude,
        vehicle.altitude || null,
        vehicle.uuid,
      ],
    );
  }
}
