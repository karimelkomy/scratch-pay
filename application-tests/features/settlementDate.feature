Feature: Settlement Date API

  Scenario: US-based initial date and delay
    Given the initialDate "2023-04-14", and delay 3
    Then the response status code should be 200
    And the response should indicate success
    And the response should contain initialQuery with initialDate: "2023-04-14" and delay: "3"
    And the response should contain results with holidayDays: 0, totalDays: 5, weekendDays: 2, and businessDate: "2023-04-19T00:00:00.000Z"

  Scenario: Egypt-based initial date and delay
    Given the initialDate "2023-04-14", delay 3, and country "EG"
    Then the response status code should be 200
    And the response should indicate success
    And the response should contain initialQuery with initialDate: "2023-04-13", delay: "3", and country: "EG"
    And the response should contain results with holidayDays: 1, totalDays: 6, weekendDays: 2, and businessDate: "2023-04-19T00:00:00.000Z"

  Scenario: Delay is 0
    Given the initialDate "2023-04-14", and delay 0
    Then the response status code should be 200
    And the response should indicate success
    And the response should contain initialQuery with initialDate: "2023-04-14" and delay: "0"
    And the response should contain results with holidayDays: 0, totalDays: 0, weekendDays: 0, and businessDate: "2023-04-14T00:00:00.000Z"

  Scenario: Initial date falls on a weekend
    Given the initialDate "2023-04-15", and delay 1
    Then the response status code should be 200
    And the response should indicate success
    And the response should contain initialQuery with initialDate: "2023-04-15" and delay: "1"
    And the response should contain results with holidayDays: 0, totalDays: 1, weekendDays: 1, and businessDate: "2023-04-17T00:00:00.000Z"

  Scenario: Invalid country code
    Given the initialDate "2023-04-14", delay 3, and country "XX"
    Then the response status code should be 200
    And the response should indicate failure
    And the response should contain errorMessage: "A valid country is required"

  Scenario: Invalid date format
    Given the initialDate "14-04-2023", and delay 3
    Then the response status code should be 200
    And the response should indicate failure
    And the response should contain errorMessage: "A valid date is required"

  Scenario: Delay in negative
    Given the initialDate "14-04-2023", and delay -3
    Then the response status code should be 200
    And the response should indicate failure
    And the response should contain errorMessage: "A valid delay is required"
