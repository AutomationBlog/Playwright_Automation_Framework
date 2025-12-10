Feature: IRCTC Railway Ticket Booking
  As a user
  I want to book a train ticket on IRCTC
  So that I can travel by train

  Scenario: Successful login to IRCTC
    Given User is on IRCTC login page
    When User enters valid credentials
    Then User should be logged in successfully

  Scenario: Failed login with invalid credentials
    Given User is on IRCTC login page
    When User enters invalid credentials
    Then User should see login error message

  Scenario: Book a train ticket
    Given User is logged in to IRCTC
    And User is on booking page
    When User searches for trains from "Delhi" to "Mumbai" on "10-12-2025" in "AC First Class"
    And User selects the first available train
    And User adds passenger details as "John Doe", age "30", gender "Male", berth preference "Lower"
    And User proceeds to payment
    Then User should see payment confirmation

  Scenario: Search trains without booking
    Given User is logged in to IRCTC
    And User is on booking page
    When User searches for trains from "Bangalore" to "Chennai" on "11-12-2025" in "Sleeper Class"
    Then User should see available trains in the results
