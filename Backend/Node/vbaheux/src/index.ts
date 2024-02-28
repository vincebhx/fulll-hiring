import { Command } from "commander";
import { createFleetCommand } from "./App/Command/createFleet.command";
import { registerVehicleCommand } from "./App/Command/registerVehicle.command";
import { parkVehicleCommand } from "./App/Command/parkVehicle.command";

const program = new Command();
program.description("Fleet Manager");
program.addCommand(createFleetCommand);
program.addCommand(registerVehicleCommand);
program.addCommand(parkVehicleCommand);

async function main() {
  await program.parseAsync();
}
main();

process.on("unhandledRejection", function (err: Error) {
  const debug = program.opts().verbose;
  if (debug) {
    console.error(err.stack);
  }
  program.error("", { exitCode: 1 });
});
