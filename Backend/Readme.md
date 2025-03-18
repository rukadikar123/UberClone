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

### GET /captain/profile

#### Description
This endpoint is used to get the profile of the logged-in captain.

#### Headers
- `Authorization` (string, required): The JWT token of the logged-in captain.

#### Responses

- `200 OK`: Captain profile retrieved successfully.
  - Example Response:
    ```json
    {
      "success": true,
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

- `401 Unauthorized`: Captain is not authenticated.
  - Example Response:
    ```json
    {
      "success": false,
      "message": "Unauthorized"
    }
    ```

### POST /captain/logout

#### Description
This endpoint is used to log out the currently logged-in captain.

#### Headers
- `Authorization` (string, required): The JWT token of the logged-in captain.

#### Responses

- `200 OK`: Captain logged out successfully.
  - Example Response:
    ```json
    {
      "success": true,
      "message": "logout successfully"
    }
    ```

- `401 Unauthorized`: Captain is not authenticated.
  - Example Response:
    ```json
    {
      "success": false,
      "message": "Unauthorized"
    }
    ```

### Ride Routes

#### Create a Ride

**Endpoint:** `GET /create`

**Description:** Create a new ride.

**Access:** Private

**Parameters:**
- `pickup` (string, required): The pickup address.
- `destination` (string, required): The destination address.
- `vehicleType` (string, required): The type of vehicle (auto, car, motorcycle).

**Response:**
- `200 OK`: Returns the created ride.
- `400 Bad Request`: Returns validation errors.

### Maps Routes

#### Get Coordinates

**Endpoint:** `GET /get-coordinates`

**Description:** Get coordinates for a given address.

**Access:** Private

**Parameters:**
- `address` (string, required): The address to get coordinates for.

**Response:**
- `200 OK`: Returns the coordinates.
- `400 Bad Request`: Returns validation errors.

#### Get Distance and Time

**Endpoint:** `GET /get-distance-time`

**Description:** Get distance and time between origin and destination.

**Access:** Private

**Parameters:**
- `origin` (string, required): The origin address.
- `destination` (string, required): The destination address.

**Response:**
- `200 OK`: Returns the distance and time.
- `400 Bad Request`: Returns validation errors.

#### Get Autocomplete Suggestions

**Endpoint:** `GET /get-suggestions`

**Description:** Get autocomplete suggestions for a given input.

**Access:** Private

**Parameters:**
- `input` (string, required): The input query for suggestions.

**Response:**
- `200 OK`: Returns the autocomplete suggestions.
- `400 Bad Request`: Returns validation errors.
