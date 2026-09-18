Feature: Ecommerce validation
@Regression
  Scenario Outline: Placing the order
    Given A login to the Ecommerce application with "<username>" and "<password>"
    When Add a "<product>" to Cart
    Then Verify "<product>" is displayed in the cart page
    When Enter valid details and place the order
    Then Verify order is present in the OrderHistory page

    Examples:
    |  product          |     username             | password    |
    |  ZARA COAT 5      | amit.tiparadi1@gmail.com | amitsan785  |


    # |  ADIDAS ORIGINAL  | amit.uxboost@gmail.com   | $Accel@tree |

@Order
Scenario: Placing the order
    Given A login to the Ecommerce2 application with "amit.tiparadi1@gmail.com" and "amitsan785"
    Then Verify error message is displayed.

    

    