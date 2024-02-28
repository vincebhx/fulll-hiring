import { Given, Then, When } from "@cucumber/cucumber";
import { USER1_UUID } from "../mocks/constants";
import assert from "assert";

Given("my user identifier", function () {
  this.userId = USER1_UUID;
});

When("I create a fleet", async function () {
  this.fleetId = await this.createFleetService.createFleet(this.userId);
});

Then("my fleet should exist", async function () {
  const fleet = await this.fleetRepository.getById(this.fleetId);
  assert.strictEqual(this.userId, fleet.owner.uuid);
});
