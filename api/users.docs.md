# User API Documentation

This document provides details about the User API endpoints for the news website.

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User (Local Auth)

```http
POST /api/users/register
```

Create a new user account with local authentication.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "",
    "authProvider": "local",
    "role": "reader",
    "active": true,
    "createdAt": "2023-06-22T10:30:00.000Z",
    "lastLogin": "2023-06-22T10:30:00.000Z"
  }
}
```

#### Login (Local Auth)

```http
POST /api/users/login
```

Authenticate a user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "",
      "authProvider": "local",
      "role": "reader",
      "active": true,
      "createdAt": "2023-06-22T10:30:00.000Z",
      "lastLogin": "2023-06-22T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Google OAuth Login

```http
POST /api/users/google-login
```

Authenticate or register a user using Google OAuth.

**Request Body:**
```json
{
  "email": "user@gmail.com",
  "name": "John Doe",
  "picture": "https://googleusercontent.com/..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "email": "user@gmail.com",
      "name": "John Doe",
      "avatar": "https://googleusercontent.com/...",
      "authProvider": "google",
      "role": "reader",
      "active": true,
      "createdAt": "2023-06-22T10:30:00.000Z",
      "lastLogin": "2023-06-22T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### User Profile

#### Get Current User Profile

```http
GET /api/users/profile
```

Get the profile of the currently authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "",
    "authProvider": "local",
    "role": "reader",
    "active": true,
    "createdAt": "2023-06-22T10:30:00.000Z",
    "lastLogin": "2023-06-22T10:30:00.000Z"
  }
}
```

#### Change Password (Local Auth Only)

```http
POST /api/users/change-password
```

Change the password for a user with local authentication.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "oldPassword": "currentpassword123",
  "newPassword": "newsecurepassword456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": {
    "success": true
  }
}
```

### User Management (Admin Only)

#### Get All Users

```http
GET /api/users
```

Get a list of all active users. Requires admin role.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "email": "user1@example.com",
      "name": "John Doe",
      "avatar": "",
      "authProvider": "local",
      "role": "reader",
      "active": true,
      "createdAt": "2023-06-22T10:30:00.000Z",
      "lastLogin": "2023-06-22T10:30:00.000Z"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "email": "user2@example.com",
      "name": "Jane Smith",
      "avatar": "https://googleusercontent.com/...",
      "authProvider": "google",
      "role": "admin",
      "active": true,
      "createdAt": "2023-06-22T11:30:00.000Z",
      "lastLogin": "2023-06-22T12:30:00.000Z"
    }
  ]
}
```

#### Get User by ID

```http
GET /api/users/:id
```

Get a specific user by their ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "",
    "authProvider": "local",
    "role": "reader",
    "active": true,
    "createdAt": "2023-06-22T10:30:00.000Z",
    "lastLogin": "2023-06-22T10:30:00.000Z"
  }
}
```

#### Update User

```http
PUT /api/users/:id
```

Update a user's information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "email": "user@example.com",
    "name": "Updated Name",
    "avatar": "https://example.com/new-avatar.jpg",
    "authProvider": "local",
    "role": "reader",
    "active": true,
    "createdAt": "2023-06-22T10:30:00.000Z",
    "lastLogin": "2023-06-22T10:30:00.000Z"
  }
}
```

#### Delete User (Soft Delete)

```http
DELETE /api/users/:id
```

Soft delete a user by setting their active status to false. Requires admin role.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access",
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied",
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found",
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```
