# Tag API Documentation

## Authentication
All protected endpoints require authentication using a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Public Endpoints

#### Get All Tags
- **URL**: `/api/tags`
- **Method**: `GET`
- **Description**: Retrieve all tags
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tags retrieved successfully",
    "data": [
      {
        "_id": "tag_id",
        "name": "Tag Name",
        "slug": "tag-name",
        "bgColor": "#ffffff",
        "textColor": "#000000",
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    ]
  }
  ```

#### Get Tags with Article Count
- **URL**: `/api/tags/with-article-count`
- **Method**: `GET`
- **Description**: Retrieve all tags with the count of articles in each tag
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tags retrieved successfully",
    "data": [
      {
        "_id": "tag_id",
        "name": "Tag Name",
        "slug": "tag-name",
        "bgColor": "#ffffff",
        "textColor": "#000000",
        "articleCount": 10,
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    ]
  }
  ```

#### Get Tag by ID
- **URL**: `/api/tags/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific tag by its ID
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tag retrieved successfully",
    "data": {
      "_id": "tag_id",
      "name": "Tag Name",
      "slug": "tag-name",
      "bgColor": "#ffffff",
      "textColor": "#000000",
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  }
  ```

#### Get Tag by Slug
- **URL**: `/api/tags/slug/:slug`
- **Method**: `GET`
- **Description**: Retrieve a specific tag by its slug
- **Response**: Same as Get Tag by ID

### Protected Endpoints (Admin Only)

#### Create Tag
- **URL**: `/api/tags`
- **Method**: `POST`
- **Description**: Create a new tag
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "name": "Tag Name",
    "bgColor": "#ffffff",
    "textColor": "#000000"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tag created successfully",
    "data": {
      "_id": "tag_id",
      "name": "Tag Name",
      "slug": "tag-name",
      "bgColor": "#ffffff",
      "textColor": "#000000",
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  }
  ```

#### Update Tag
- **URL**: `/api/tags/:id`
- **Method**: `PUT`
- **Description**: Update an existing tag
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "name": "Updated Tag Name",
    "bgColor": "#f0f0f0",
    "textColor": "#333333"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tag updated successfully",
    "data": {
      "_id": "tag_id",
      "name": "Updated Tag Name",
      "slug": "updated-tag-name",
      "bgColor": "#f0f0f0",
      "textColor": "#333333",
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  }
  ```

#### Delete Tag
- **URL**: `/api/tags/:id`
- **Method**: `DELETE`
- **Description**: Delete a tag
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tag deleted successfully",
    "data": null
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Tag name is required and must be a non-empty string"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Tag not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
``` 