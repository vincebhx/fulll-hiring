import { Command } from "commander";
import { LoggerService } from "../../Infra/Logger/logger.service";
import { ParkVehicleService } from "../Service/parkVehicle.service";
import {
  parseFloatCommand,
  parseOptionalIntCommand,
} from "../../Infra/command.utils";
import { MySQLVehicleRepository } from "../../Domain/Repository/Impl/mySQLVehicleRepository.class";

const parkVehicleCommand = new Command("localize-vehicle");

parkVehicleCommand
  .argument("<fleetId>", "id of the fleet")
  .argument("<vehiclePlateNumber>", "the vehicle's plate number")
  .argument("lat", "the vehicle's latitude", parseFloatCommand)
  .argument("lng", "the vehicle's longitude", parseFloatCommand)
  .argument(
    "[alt]",
    "the vehicle's altitude (optional)",
    parseOptionalIntCommand,
  )
  .action(
    async (
      fleetId: string,
      vehiclePlateNumber: string,
      latitude: number,
      longitude: number,
      altitude?: number,
    ) => {
      try {
        // Inject dependencies
        const parkVehicleService = new ParkVehicleService(
          new MySQLVehicleRepository(),
        );
        // Park the vehicle
        await parkVehicleService.parkVehicle(fleetId, vehiclePlateNumber, {
          latitude,
          longitude,
          altitude,
        });
        LoggerService.info(
          `Vehicle ${vehiclePlateNumber}'s location successfully updated.`,
        );
      } catch (err) {
        LoggerService.error(err);
      }
      process.exit();
    },
  );

export { parkVehicleCommand };
