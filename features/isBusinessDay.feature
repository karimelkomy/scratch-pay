Feature: Check if a date is a business day

  Scenario: Verify a business day
    Given a date of "2023-04-14"
    When I check if it is a business day
    Then the response should be "true"

  Scenario: Verify a weekend day
    Given a date of "2023-04-15"
    When I check if it is a business day
    Then the response should be "false"

  Scenario: Verify a holiday
    Given a date of "2023-12-25"
    When I check if it is a business day
    Then the response should be "false"

  Scenario: Verify no date
    Given a date of ""
    When I check if it is a business day
    Then the response should be an error message

  Scenario: Invalid date
    Given a date of "2023-02-29"
    When I check if it is a business day
    Then the response should be an error message
