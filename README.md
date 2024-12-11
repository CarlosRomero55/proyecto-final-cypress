🛒 Cypress E2E Testing with Cucumber

  🎁✨

🚀 Project Overview

This repository showcases an end-to-end (E2E) testing project using Cypress (v9.7.0) and Cucumber for behavior-driven development (BDD).

🛠️ Features Tested:

Add and Remove Products: Verify the functionality of adding and removing items from the shopping cart.

Swipe Actions: Test swipe gestures for enhanced user interactions.

Navigation Bar: Validate smooth navigation across the app's options bar.

🧪 Tech Stack:

Cypress (v9.7.0): Fast and reliable E2E testing framework.

Cucumber: Simplifies test scenarios with human-readable Gherkin syntax.

📂 Project Structure

|-- cypress
|   |-- integration
|   |   |-- features
|   |   |   |-- shopping_cart.feature  # Gherkin scenarios
|   |-- support
|       |-- step_definitions
|           |-- shopping_cart_steps.js # Step definitions
|-- cypress.json  # Cypress configuration
|-- package.json  # Node.js dependencies

🌟 Example Gherkin Scenario:

Feature: Shopping Cart Functionality
  Scenario: Add and Remove Items
    Given I am on the shopping page
    When I add a product to the cart
    And I remove a product from the cart
    Then the cart should reflect the correct item count

⚙️ Installation and Setup

Clone the repository:

git clone https://github.com/CarlosRomero55/proyecto-final-cypress

Install dependencies:

npm install

Run tests:

npx cypress open

or headless mode:

npx cypress run

🎯 Key Functionalities

Adding and Removing Products

Ensures accurate reflection of cart content after adding/removing items.

Validates product quantity and total price updates.

Swipe Actions

Simulates user gestures like swiping on touch-enabled devices.

Navigation Bar

Tests smooth interaction and transitions between app sections.

✨ Emojis and Fun!

🎁 Tested with love and care to ensure your shopping experience is bug-free.✨

🤝 Contributions

Contributions are welcome! If you'd like to contribute:

Fork the repository.

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m 'Add new feature'

Push to the branch: git push origin feature-name

Open a pull request.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

🚀 Happy Testing! 🛍️ 🎉
