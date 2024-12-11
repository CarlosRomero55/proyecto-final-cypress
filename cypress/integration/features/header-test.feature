Feature: Header Navigation Functionality
  As a website user
  I want to use the header navigation menu
  So that I can access different sections of the website easily

  Background:
    Given the header navigation menu is visible

  @main-page
  Scenario: Different link behaviors validation
    When I click on "Home"
    Then I should be able to see the carousel
    When I click on "LogIn"
    Then a "Log in" modal should appear
    And the modal should contain login form fields

  @cart-page
  Scenario: Navigation state preservation
    Given I am on the "Cart" page
    And I have items in my cart
    When I navigate to "Home" section
    Then I return to the "Cart" page
    And my cart should remain with items

  @main-page
  Scenario: Header interaction states
    When I hover over "Home" link
    Then the link should display a visual hover state
    And the cursor should change to indicate it's clickable