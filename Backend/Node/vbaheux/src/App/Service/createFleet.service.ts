import { FleetRepository } from "../../Domain/Repository/fleet.repository";
import { UserRepository } from "../../Domain/Repository/user.repository";
import { Fleet } from "../../Domain/Model/fleet.class";
import { randomUUID, UUID } from "crypto";
import { MySQLFleetRepository } from "../../Domain/Repository/Impl/mySQLFleetRepository.class";
import { MySQLUserRepository } from "../../Domain/Repository/Impl/mySQLUserRepository.class";

export class CreateFleetService {
  private userRepository: UserRepository;
  private fleetRepository: FleetRepository;

  constructor(
    userRepository: UserRepository,
    fleetRepository: FleetRepository,
  ) {
    this.userRepository = userRepository;
    this.fleetRepository = fleetRepository;
  }

  /**
   * Create a new fleet for a given user
   * @param userId the owner of the new fleet
   * @returns the id of the new fleet
   */
  async createFleet(userId: UUID) {
    const owner = await this.userRepository.getById(userId);
    if (!owner) {
      throw new Error("User not found.");
    }
    const newFleet = new Fleet({
      uuid: randomUUID(),
      owner,
    });
    const fleet = await this.fleetRepository.persist(newFleet);
    return fleet.uuid;
  }
}
