import { Command } from "commander";
import { CreateFleetService } from "../Service/createFleet.service";
import { LoggerService } from "../../Infra/Logger/logger.service";
import { UUID } from "crypto";
import { MySQLUserRepository } from "../../Domain/Repository/Impl/mySQLUserRepository.class";
import { MySQLFleetRepository } from "../../Domain/Repository/Impl/mySQLFleetRepository.class";

const createFleetCommand = new Command("create");

createFleetCommand
  .argument("<userId>", "id of the owner of the fleet")
  .action(async (userId: UUID) => {
    try {
      // Inject dependencies
      const createFleetService = new CreateFleetService(
        new MySQLUserRepository(),
        new MySQLFleetRepository(),
      );
      // Create the fleet
      const newFleetId = await createFleetService.createFleet(userId);
      LoggerService.info(
        "New fleet successfully created. Fleet ID:",
        newFleetId,
      );
    } catch (err) {
      LoggerService.error(err);
    }
    process.exit();
  });

export { createFleetCommand };
