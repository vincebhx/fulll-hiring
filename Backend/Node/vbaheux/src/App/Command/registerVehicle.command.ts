import { Command } from "commander";
import { RegisterVehicleService } from "../Service/registerVehicle.service";
import { LoggerService } from "../../Infra/Logger/logger.service";
import { MySQLFleetRepository } from "../../Domain/Repository/Impl/mySQLFleetRepository.class";
import { MySQLVehicleRepository } from "../../Domain/Repository/Impl/mySQLVehicleRepository.class";
import { UUID } from "crypto";

const registerVehicleCommand = new Command("register-vehicle");

registerVehicleCommand
  .argument("<fleet>", "id of the fleet")
  .argument("<vehiclePlateNumber>", "the vehicle's plate number")
  .action(async (fleet: UUID, vehiclePlateNumber: string) => {
    try {
      // Inject dependencies
      const registerVehicleService = new RegisterVehicleService(
        new MySQLFleetRepository(),
        new MySQLVehicleRepository(),
      );
      // Register the vehicle
      await registerVehicleService.registerVehicle(fleet, vehiclePlateNumber);
      LoggerService.info(`Vehicle ${vehiclePlateNumber} added to fleet.`);
    } catch (err) {
      LoggerService.error(err);
    }
    process.exit();
  });

export { registerVehicleCommand };
