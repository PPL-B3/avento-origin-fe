Feature: User Authentication
  As a user
  I want to be able to log in to the application
  So that I can access my account

  @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should be redirected to the dashboard page
    And I should see a welcome message

  @login
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid username or password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @login
  Scenario: Logout functionality
    Given I am logged in
    When I click the logout button
    Then I should be redirected to the login page
    And I should be logged out of the system
