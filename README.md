# TechTrove

TechTrove is a full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It supports real-time stock updates, secure user authentication, and optimized performance for handling up to 20 concurrent users. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Stock Updates**: Inventory is updated instantly with each transaction.
- **JWT Authentication**: Secure user login and session management with JSON Web Tokens.
- **State Management**: Uses React Context for handling shopping cart and authentication states.
- **Data Security**: MongoDB with secure connections, hashed passwords, and role-based access control.
- **Optimized Performance**: Scalable to support multiple concurrent users with fast database queries.

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Rakesh2908/tech_ecommerce.git
    cd TechTrove
    ```

2. Install dependencies for both the backend and frontend:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and add the following variables:
        ```env
        MONGODB_URI=<Your MongoDB URI>
        JWT_SECRET=<Your JWT Secret>
        ```

4. Run the server:
    ```bash
    npm start
    ```

## Usage

- Visit `http://localhost:3000` to view the frontend.
- Use the authentication system to sign up/log in.
- Browse products, add items to the shopping cart, and complete a purchase.
  
## API Endpoints

- **Auth Routes**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in an existing user

- **Product Routes**
  - `GET /api/products` - Fetch all products
  - `POST /api/products` - Add a new product (Admin only)

- **Cart Routes**
  - `GET /api/cart` - Get user's cart items
  - `POST /api/cart` - Add an item to the cart

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
