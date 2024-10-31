
# Car Rental Backend API

This is the backend API for a car rental application. The API allows for managing cars, users, and reservations, with functionalities for listing, creating, updating, and deleting resources. It is built with Node.js, Express, and MongoDB.

## Features
- **User Management**: Register, login, and manage users.
- **Car Management**: Add, update, view, and delete car listings.
- **Reservation Management**: Create, list, and delete reservations for car rentals.
- **Authentication**: User authentication using JWT (JSON Web Tokens).
- **Data Security**: Passwords are encrypted using bcrypt.

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **bcrypt**: Library for password hashing.
- **jsonwebtoken**: Library for token-based authentication.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/car-rental-backend.git
   cd car-rental-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` by default.

### API Endpoints & Sample Data

#### User Routes
- `POST /api/users/register`: Register a new user.
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
- `POST /api/users/login`: Log in an existing user.
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```

#### Car Routes
- `GET /api/cars`: Get all cars.
- `POST /api/cars`: Add a new car (Admin only).
  ```json
  {
    "name": "Fiat Mobi",
    "model": "Hatchback",
    "weeklyRate": 400
  }
  ```
- `GET /api/cars/:id`: Get details of a specific car.
- `PUT /api/cars/:id`: Update a car’s details.
  ```json
  {
    "name": "Renault Kwid",
    "model": "SUV",
    "weeklyRate": 450
  }
  ```
- `DELETE /api/cars/:id`: Delete a car.

#### Reservation Routes
- `POST /api/reservations`: Create a new reservation.
  ```json
  {
    "userId": "614c1b0b7f354f39c1c56c0e",
    "carId": "614c1b4d7f354f39c1c56c10",
    "startDate": "2024-11-01T00:00:00.000Z",
    "endDate": "2024-11-07T23:59:59.000Z"
  }
  ```
- `GET /api/reservations`: Get all reservations.
- `GET /api/reservations/:id`: Get details of a specific reservation.
- `DELETE /api/reservations/:id`: Delete a reservation.

## Models

### User
- `name`: String - Name of the user.
- `email`: String - Email of the user, must be unique.
- `password`: String - Hashed password.

### Car
- `name`: String - Name of the car model.
- `model`: String - Model details of the car.
- `weeklyRate`: Number - Weekly rental rate for the car.

### Reservation
- `userId`: ObjectId - Reference to the User.
- `carId`: ObjectId - Reference to the Car.
- `startDate`: Date - Start date of the reservation.
- `endDate`: Date - End date of the reservation.

## Security & Authentication
- Passwords are hashed using bcrypt.
- JWT is used for user authentication and protecting routes.

## License
This project is licensed under the MIT License.

---

### Notes
- Ensure MongoDB is running before starting the server.
- Use tools like Postman or Insomnia to test the API endpoints.
