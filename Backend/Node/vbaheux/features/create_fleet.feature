Feature: Create a fleet

  In order to follow many vehicles with my application
  As an application user
  I should be able to create a fleet

  @critical
  Scenario: I can create a fleet
    Given my user identifier
    When I create a fleet
    Then my fleet should exist
