# Category API Documentation

## Authentication
All protected endpoints require authentication using a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Public Endpoints

#### Get All Categories
- **URL**: `/api/categories`
- **Method**: `GET`
- **Description**: Retrieve all categories
- **Response**:
  ```json
  {
    "success": true,
    "message": "Categories retrieved successfully",
    "data": [
      {
        "_id": "category_id",
        "name": "Category Name",
        "slug": "category-name",
        "images": ["image_url1", "image_url2"],
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    ]
  }
  ```

#### Get Categories with Article Count
- **URL**: `/api/categories/with-article-count`
- **Method**: `GET`
- **Description**: Retrieve all categories with the count of articles in each category
- **Response**:
  ```json
  {
    "success": true,
    "message": "Categories retrieved successfully",
    "data": [
      {
        "_id": "category_id",
        "name": "Category Name",
        "slug": "category-name",
        "images": ["image_url1", "image_url2"],
        "articleCount": 10,
        "createdAt": "2024-03-20T10:00:00.000Z",
        "updatedAt": "2024-03-20T10:00:00.000Z"
      }
    ]
  }
  ```

#### Get Category by ID
- **URL**: `/api/categories/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific category by its ID
- **Response**:
  ```json
  {
    "success": true,
    "message": "Category retrieved successfully",
    "data": {
      "_id": "category_id",
      "name": "Category Name",
      "slug": "category-name",
      "images": ["image_url1", "image_url2"],
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  }
  ```

#### Get Category by Slug
- **URL**: `/api/categories/slug/:slug`
- **Method**: `GET`
- **Description**: Retrieve a specific category by its slug
- **Response**: Same as Get Category by ID

### Protected Endpoints (Admin Only)

#### Create Category
- **URL**: `/api/categories`
- **Method**: `POST`
- **Description**: Create a new category
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "name": "Category Name",
    "images": ["image_url1", "image_url2"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Category created successfully",
    "data": {
      "_id": "category_id",
      "name": "Category Name",
      "slug": "category-name",
      "images": ["image_url1", "image_url2"],
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  }
  ```

#### Update Category
- **URL**: `/api/categories/:id`
- **Method**: `PUT`
- **Description**: Update an existing category
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Request Body**:
  ```json
  {
    "name": "Updated Category Name",
    "images": ["new_image_url1", "new_image_url2"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Category updated successfully",
    "data": {
      "_id": "category_id",
      "name": "Updated Category Name",
      "slug": "updated-category-name",
      "images": ["new_image_url1", "new_image_url2"],
      "createdAt": "2024-03-20T10:00:00.000Z",
      "updatedAt": "2024-03-20T10:00:00.000Z"
    }
  }
  ```

#### Delete Category
- **URL**: `/api/categories/:id`
- **Method**: `DELETE`
- **Description**: Delete a category
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Category deleted successfully",
    "data": null
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Category name is required and must be a non-empty string"
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
  "message": "Category not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
``` 