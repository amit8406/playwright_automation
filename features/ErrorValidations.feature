Feature: Ecommerce validation
@Validations
@foo
  Scenario: Placing the order
    Given A login to the Ecommerce2 application with "amit.tiparadi1@gmail.com" and "amitsan785"
    Then Verify error message is displayed.