import {
  FleetInterface,
  LocationInterface,
  UserInterface,
  VehicleInterface,
} from "../../src/Domain/Model/entity.interface";
import { UUID } from "crypto";

export const USER1_UUID: UUID = "8e07aad4-fb2f-4067-a66f-3cdb54224214";
export const USER2_UUID: UUID = "8e07aad4-fb2f-4067-a66f-3cdb54224214";
export const USER_1: UserInterface = { uuid: USER1_UUID, username: "User 1" };
export const USER_2: UserInterface = { uuid: USER2_UUID, username: "User 2" };

export const FLEET1_UUID: UUID = "7d9c7eae-bcf1-48a0-a690-2f49a9f165f9";
export const FLEET2_UUID: UUID = "80228078-7a37-4571-bf2e-eb73af2385cf";
export const FLEET_1: FleetInterface = { uuid: FLEET1_UUID, owner: USER_1 };
export const FLEET_2: FleetInterface = { uuid: FLEET2_UUID, owner: USER_2 };

export const VEHICLE1_PLATE: string = "AA123AA";
export const VEHICLE_1: VehicleInterface = {
  uuid: "10d0f6ec-3df9-4092-95ae-3aa2d0355d40",
  plate_number: VEHICLE1_PLATE,
  latitude: 0,
  longitude: 0,
};

export const LOCATION_1: LocationInterface = {
  latitude: 34.056687222,
  longitude: -117.195731667,
  altitude: 0,
};
