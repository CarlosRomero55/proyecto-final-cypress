Feature: E-commerce Core Shopping Flow
  As a customer
  I want to browse products, manage my cart and complete purchases
  So that I can successfully shop online

  @main-page
  Scenario: Select product category
    When I click on a product category
    Then I should see only products from that category
    And the category should be highlighted as selected

  @main-page
  Scenario: View product details
    When I click on a product
    Then all the product's information should be visible
    And the presented title and descriptions should match with the ones of the product clicked

  @main-page
  Scenario: Add product to cart
    When I click "Add to Cart" on a product
    Then the product should be added to my cart
    And cart total should update accordingly

  @cart-page
  Scenario: Remove product from cart
    When I remove a product from the cart
    Then the product should no longer appear in cart
    And cart total should be recalculated

  @cart-page
  Scenario: Complete purchase
    Given I have items in my cart
    When I proceed to checkout
    And I fill in required payment details
    Then I should receive order confirmation