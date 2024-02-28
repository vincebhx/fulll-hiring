import { db } from "../../../Infra/Database/connect";
import { RowDataPacket } from "mysql2";
import { Fleet } from "../../Model/fleet.class";
import { Vehicle } from "../../Model/vehicle.class";
import { FleetRepository } from "../fleet.repository";

export class MySQLFleetRepository implements FleetRepository {
  constructor() {}

  async getById(id: string) {
    const [results] = await db.query<RowDataPacket[]>(
      `SELECT
            fleets.uuid AS uuid,
            vehicles.plate_number AS plate_number
          FROM fleets
          LEFT JOIN fleet_vehicles ON fleet_vehicles.fleet_id = fleets.uuid
          LEFT JOIN vehicles ON fleet_vehicles.vehicle_id = vehicles.uuid
          WHERE fleets.uuid = ?;
        `,
      [id],
    );
    if (results.length > 0) {
      return new Fleet({
        uuid: results[0]["uuid"],
        vehicles: results
          .map((row) => row["plate_number"])
          .filter((plateNumber) => !!plateNumber),
      });
    }
  }

  async persist(fleet: Fleet) {
    await db.query("INSERT INTO fleets (uuid, owner_id) VALUES (?, ?)", [
      fleet.uuid,
      fleet.owner?.uuid,
    ]);
    return fleet;
  }

  async addVehicleToFleet(fleet: Fleet, vehicle: Vehicle) {
    await db.query(
      "INSERT INTO fleet_vehicles (fleet_id, vehicle_id) VALUES (?, ?)",
      [fleet.uuid, vehicle.uuid],
    );
  }
}
