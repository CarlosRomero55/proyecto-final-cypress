Feature: E-commerce Shopping Flow
  As a customer
  I want to browse products, manage my cart and complete purchases
  So that I can successfully shop online

  @main-page
  Scenario: View product details
    When I click on a product
    Then all the product's information should be visible
    And the presented title and descriptions should match with the ones of the product clicked

  @main-page
  Scenario: Add product to cart
    Given I choose a product from the grid
    When I add product to the cart
    Then the product should be added to my cart

  @cart-page
  Scenario: Remove product from cart
    Given I have items in my cart
    When I remove the last product added to the cart
    Then the product should no longer appear in cart
    And cart total should be recalculated

  @cart-page
  Scenario: Complete purchase
    Given cart has at least 3 product
    When I proceed to checkout
    And I fill in required payment details
    Then I should see "Thank you for your purchase!" as a successful purchase message