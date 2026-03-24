Feature: Purchase a product end-to-end

  Scenario: User logs in and buys a product successfully
    Given User launches the application
    When User logs in with valid credentials
    And User adds a product to the cart
    And User verifies product in the cart
    And User proceeds to checkout
    And User selects the country and places the order
    Then Order should be placed successfully
