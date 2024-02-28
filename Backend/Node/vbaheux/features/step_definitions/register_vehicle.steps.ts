import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { FLEET_2 } from "../mocks/constants";
import { Fleet } from "../../src/Domain/Model/fleet.class";

Given("the fleet of another user", function () {
  this.otherUserFleet = new Fleet(FLEET_2);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    await this.registerVehicleService.registerVehicle(
      this.otherUserFleet.uuid,
      this.vehicle.plate_number,
    );
  },
);

When("I register this vehicle into my fleet", async function () {
  await this.registerVehicleService.registerVehicle(
    this.fleet.uuid,
    this.vehicle.plate_number,
  );
});

When("I try to register this vehicle into my fleet", async function () {
  try {
    await this.registerVehicleService.registerVehicle(
      this.fleet.uuid,
      this.vehicle.plate_number,
    );
  } catch (err) {
    if (err instanceof Error) {
      this.errorMessage = err.message;
    }
  }
});

Then("this vehicle should be part of my vehicle fleet", async function () {
  const fleet = await this.fleetRepository.getById(this.fleet.uuid);
  const vehicleIndex = fleet.vehicles.findIndex(
    (vehicle: string) => vehicle === this.vehicle.plate_number,
  );
  assert.notStrictEqual(vehicleIndex, -1);
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.strictEqual(this.errorMessage, "Vehicle already in fleet.");
  },
);
