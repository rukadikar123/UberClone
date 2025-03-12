# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body must be a JSON object with the following properties:

- `fullName`: An object containing:
  - `firstName` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastName` (string, required): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

#### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- `200 OK`: User registered successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

- `400 Bad Request`: Invalid input data.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- `409 Conflict`: Email is already registered.
  - Example Response:
    ```json
    {
      "error": "Email is already registered"
    }
    ```

### POST /users/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body must be a JSON object with the following properties:

- `email` (string ): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user. Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- `200 OK`: User logged in successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

- `400 Bad Request`: Invalid input data.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- `401 Unauthorized`: Invalid email or password.
  - Example Response:
    ```json
    {
      "message": "invalid email or password"
    }
    ```

### GET /users/profile

#### Description
This endpoint is used to get the profile of the logged-in user.

#### Headers
- `Authorization` (string, required): The JWT token of the logged-in user.

#### Responses

- `200 OK`: User profile retrieved successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

- `401 Unauthorized`: User is not authenticated.
  - Example Response:
    ```json
    {
      "success": false,
      "message": "Unauthorized"
    }
    ```

### POST /users/logout

#### Description
This endpoint is used to log out the currently logged-in user.

#### Headers
- `Authorization` (string, required): The JWT token of the logged-in user.

#### Responses

- `200 OK`: User logged out successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "message": "User Logged Out Successfully"
    }
    ```

- `401 Unauthorized`: User is not authenticated.
  - Example Response:
    ```json
    {
      "success": false,
      "message": "Unauthorized"
    }
    ```

### POST /captain/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body must be a JSON object with the following properties:

- `fullName`: An object containing:
  - `firstName` (string, required): The first name of the captain. Must be at least 3 characters long.
  - `lastName` (string, required): The last name of the captain. Must be at least 3 characters long.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle`: An object containing:
  - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string, required): The plate number of the vehicle. Must be at least 4 characters long.
  - `capacity` (number, required): The capacity of the vehicle. Must be at least 1.
  - `vehicleType` (string, required): The type of the vehicle. Must be one of 'car', 'motorcycle', or 'auto'.

#### Example Request
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses

- `200 OK`: Captain registered successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "token": "jwt_token_here",
      "captain": {
        "_id": "captain_id_here",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC1234",
          "capacity": 4,
          "vehicleType": "car"
        },
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

- `400 Bad Request`: Invalid input data.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- `409 Conflict`: Email is already registered.
  - Example Response:
    ```json
    {
      "message": "Email is already registered"
    }
    ```

### POST /captain/login

#### Description
This endpoint is used to log in an existing captain.

#### Request Body
The request body must be a JSON object with the following properties:

- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

#### Responses

- `200 OK`: Captain logged in successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "token": "jwt_token_here",
      "captain": {
        "_id": "captain_id_here",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC1234",
          "capacity": 4,
          "vehicleType": "car"
        },
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```

- `400 Bad Request`: Invalid input data.
  - Example Response:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- `401 Unauthorized`: Invalid email or password.
  - Example Response:
    ```json
    {
      "message": "invalid email or password"
    }
    ```
