Feature: Main Carousel Functionality
  As a website user
  I want to navigate through the main image carousel
  In order to view different featured products

  Background:
    Given the carousel is visible

  Scenario: Navigate carousel to the right
    When there is an active carousel image
    And I click on the carousel's right arrow
    Then the new displayed image should be different from the previous one
    And the previous image should not be visible  

  Scenario: Complete cyclic navigation of carousel
    When 'First slide' image is visible
    And I click on the carousel's right arrow navigating through all items
    Then it should display the 'First slide' image again

  Scenario: Carousel automatic sliding functionality
    Given I don't interact with the carousel
    When I wait for 1 seconds
    Then images should change automatically