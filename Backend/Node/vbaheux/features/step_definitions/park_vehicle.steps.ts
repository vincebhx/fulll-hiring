import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { LOCATION_1 } from "../mocks/constants";

Given("a location", function () {
  this.location = LOCATION_1;
});

Given("my vehicle has been parked into this location", async function () {
  await this.parkVehicleService.parkVehicle(
    this.fleet.uuid,
    this.vehicle.plate_number,
    this.location,
  );
});

When("I park my vehicle at this location", async function () {
  await this.parkVehicleService.parkVehicle(
    this.fleet.uuid,
    this.vehicle.plate_number,
    this.location,
  );
});

When("I try to park my vehicle at this location", async function () {
  try {
    await this.parkVehicleService.parkVehicle(
      this.fleet.uuid,
      this.vehicle.plate_number,
      this.location,
    );
  } catch (err) {
    if (err instanceof Error) {
      this.errorMessage = err.message;
    }
  }
});

Then(
  "the known location of my vehicle should verify this location",
  async function () {
    const vehicle = await this.vehicleRepository.getByPlateNumber(
      this.vehicle.plate_number,
    );
    assert.strictEqual(this.location.latitude, vehicle.latitude);
    assert.strictEqual(this.location.longitude, vehicle.longitude);
    assert.strictEqual(this.location.altitude, vehicle.altitude);
  },
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.strictEqual(
      this.errorMessage,
      "Vehicle already parked at this location.",
    );
  },
);
