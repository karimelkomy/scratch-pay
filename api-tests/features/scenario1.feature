Feature: Scenario 1

  Scenario: User with invalid credentials cannot log in
    When user tries to log in with invalid email and password
    Then user should receive a response with status code 400

  Scenario: User with valid credentials can log in and receive a JWT token
    Given user is logged in with valid credentials
    Then user should receive a response with status code 200
    And user should receive a JWT token

  Scenario: Logged-in user with valid credentials is prevented from getting the list of email addresses of practice id 2
    Given user is logged in with valid credentials
    When user tries to get the list of email addresses for practice id 2
    Then user should receive a response with status code 400

  Scenario: Logged-in user with invalid JWT token is prevented from getting the list of email addresses
    Given user is logged in with an invalid JWT token
    When user tries to get the list of email addresses for practice id 2
    Then user should receive a response with status code 401
