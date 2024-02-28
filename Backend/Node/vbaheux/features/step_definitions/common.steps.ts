import { Before, Given } from "@cucumber/cucumber";
import { RegisterVehicleService } from "../../src/App/Service/registerVehicle.service";
import {
  FLEET_1,
  FLEET_2,
  USER_1,
  USER_2,
  VEHICLE_1,
} from "../mocks/constants";
import { TestUserRepository } from "../mocks/testUserRepository.class";
import { TestFleetRepository } from "../mocks/testFleetRepository.class";
import { TestVehicleRepository } from "../mocks/testVehicleRepository.class";
import { CreateFleetService } from "../../src/App/Service/createFleet.service";
import { ParkVehicleService } from "../../src/App/Service/parkVehicle.service";
import { User } from "../../src/Domain/Model/user.class";
import { Fleet } from "../../src/Domain/Model/fleet.class";
import { Vehicle } from "../../src/Domain/Model/vehicle.class";

Before(function () {
  this.users = [new User(USER_1), new User(USER_2)];
  this.fleets = [new Fleet(FLEET_1), new Fleet(FLEET_2)];
  this.vehicles = [new Vehicle(VEHICLE_1)];
  this.fleetVehicles = [];

  this.userRepository = new TestUserRepository(this.users);
  this.fleetRepository = new TestFleetRepository(
    this.fleets,
    this.fleetVehicles,
  );
  this.vehicleRepository = new TestVehicleRepository(
    this.vehicles,
    this.fleetVehicles,
  );
  this.createFleetService = new CreateFleetService(
    this.userRepository,
    this.fleetRepository,
  );
  this.registerVehicleService = new RegisterVehicleService(
    this.fleetRepository,
    this.vehicleRepository,
  );
  this.parkVehicleService = new ParkVehicleService(this.vehicleRepository);
});

Given("my fleet", function () {
  this.fleet = FLEET_1;
});

Given("a vehicle", function () {
  this.vehicle = new Vehicle(VEHICLE_1);
});

Given("I have registered this vehicle into my fleet", async function () {
  await this.registerVehicleService.registerVehicle(
    this.fleet.uuid,
    this.vehicle.plate_number,
  );
});
