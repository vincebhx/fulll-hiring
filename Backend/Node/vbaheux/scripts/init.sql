CREATE TABLE users (
    uuid VARCHAR(36) PRIMARY KEY,
    username VARCHAR(64) NOT NULL
);

CREATE TABLE fleets (
    uuid VARCHAR(36) PRIMARY KEY,
    owner_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(uuid) ON DELETE CASCADE
);

CREATE TABLE vehicles (
    uuid VARCHAR(36) PRIMARY KEY,
    plate_number VARCHAR(7) UNIQUE NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    altitude SMALLINT
);

CREATE TABLE fleet_vehicles (
   fleet_id VARCHAR(36) NOT NULL,
   vehicle_id VARCHAR(36) NOT NULL,
   INDEX fleet_idx (fleet_id),
   FOREIGN KEY (fleet_id) REFERENCES fleets(uuid) ON DELETE CASCADE,
   FOREIGN KEY (vehicle_id) REFERENCES vehicles(uuid) ON DELETE CASCADE,
   CONSTRAINT UC_FleetVehicle UNIQUE (fleet_id, vehicle_id)
);

INSERT INTO users (uuid, username) VALUES ('8e07aad4-fb2f-4067-a66f-3cdb54224214', 'User 1');
INSERT INTO users (uuid, username) VALUES ('77cc3b61-b366-4d6b-9c77-8a72a0bbe09d', 'User 2');
