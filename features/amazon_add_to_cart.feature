Feature: Amazon add to cart

  @smoke
  Scenario: Search for an item and add first result to cart
    Given I open the Amazon home page
    When I search for "playwright book"
    And I open the first search result
    And I add the product to the cart
    Then the cart should contain at least 1 item

  @regression
  Scenario: Search for an item and add first result to cart
    Given I open the Amazon home page
    When I search for "playwright book"
    And I open the first search result
    And I add the product to the cart
    Then the cart should contain at least 1 item
