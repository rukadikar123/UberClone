Full Stack Uber Clone

# API Documentation

## Endpoints

### POST /users/register
// ...existing code...

### POST /users/login
// ...existing code...

### GET /users/profile

**Description:** Get the profile of the logged-in user.

**Headers:**
- `Authorization`: Bearer token

**Response:**
- `200 OK`: Returns the user profile.
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      // ...other user fields...
    }
  }
  ```

- `401 Unauthorized`: If the user is not logged in.

### GET /users/logout

**Description:** Log out the currently logged-in user.

**Headers:**
- `Authorization`: Bearer token

**Response:**
- `200 OK`: Successfully logged out.
  ```json
  {
    "success": true,
    "message": "User Logged Out Successfully"
  }
  ```

- `401 Unauthorized`: If the user is not logged in.
