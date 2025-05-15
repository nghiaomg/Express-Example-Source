# Article API Documentation

This document provides details about the Article API endpoints for the news website.

## Authentication

Some endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Public Endpoints

#### Get All Articles

```http
GET /api/articles
```

Get a paginated list of articles with optional filters.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category ID
- `tag` (optional): Filter by tag ID
- `search` (optional): Search in title, summary, and content
- `sortBy` (optional): Sort field (default: publishedAt)
- `sortOrder` (optional): Sort order (asc/desc, default: desc)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Articles retrieved successfully",
  "data": {
    "articles": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "title": "Tiêu đề bài báo",
        "slug": "tieu-de-bai-bao",
        "summary": "Tóm tắt bài báo...",
        "content": "Nội dung HTML...",
        "source": {
          "name": "VnExpress",
          "url": "https://vnexpress.net/abc.html"
        },
        "tags": [
          {
            "_id": "60d21b4667d0d8992e610c86",
            "name": "Tag 1",
            "slug": "tag-1"
          }
        ],
        "category": {
          "_id": "60d21b4667d0d8992e610c87",
          "name": "Category 1",
          "slug": "category-1"
        },
        "thumbnail": "https://example.com/image.jpg",
        "publishedAt": "2023-06-22T10:30:00.000Z",
        "crawledAt": "2023-06-22T10:30:00.000Z",
        "isCrawled": true,
        "views": 1234
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10
    }
  }
}
```

#### Get Trending Articles

```http
GET /api/articles/trending
```

Get the most viewed articles.

**Query Parameters:**
- `limit` (optional): Number of articles to return (default: 5)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Trending articles retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Tiêu đề bài báo",
      "slug": "tieu-de-bai-bao",
      "summary": "Tóm tắt bài báo...",
      "thumbnail": "https://example.com/image.jpg",
      "views": 1234
    }
  ]
}
```

#### Search Articles

```http
GET /api/articles/search
```

Search articles by query string.

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Number of results to return (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Search results retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Tiêu đề bài báo",
      "slug": "tieu-de-bai-bao",
      "summary": "Tóm tắt bài báo...",
      "thumbnail": "https://example.com/image.jpg"
    }
  ]
}
```

#### Get Article by ID

```http
GET /api/articles/:id
```

Get a specific article by its ID.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Article retrieved successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Tiêu đề bài báo",
    "slug": "tieu-de-bai-bao",
    "summary": "Tóm tắt bài báo...",
    "content": "Nội dung HTML...",
    "source": {
      "name": "VnExpress",
      "url": "https://vnexpress.net/abc.html"
    },
    "tags": [
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Tag 1",
        "slug": "tag-1"
      }
    ],
    "category": {
      "_id": "60d21b4667d0d8992e610c87",
      "name": "Category 1",
      "slug": "category-1"
    },
    "thumbnail": "https://example.com/image.jpg",
    "publishedAt": "2023-06-22T10:30:00.000Z",
    "crawledAt": "2023-06-22T10:30:00.000Z",
    "isCrawled": true,
    "views": 1234
  }
}
```

#### Get Article by Slug

```http
GET /api/articles/slug/:slug
```

Get a specific article by its slug.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Article retrieved successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Tiêu đề bài báo",
    "slug": "tieu-de-bai-bao",
    "summary": "Tóm tắt bài báo...",
    "content": "Nội dung HTML...",
    "source": {
      "name": "VnExpress",
      "url": "https://vnexpress.net/abc.html"
    },
    "tags": [
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Tag 1",
        "slug": "tag-1"
      }
    ],
    "category": {
      "_id": "60d21b4667d0d8992e610c87",
      "name": "Category 1",
      "slug": "category-1"
    },
    "thumbnail": "https://example.com/image.jpg",
    "publishedAt": "2023-06-22T10:30:00.000Z",
    "crawledAt": "2023-06-22T10:30:00.000Z",
    "isCrawled": true,
    "views": 1234
  }
}
```

#### Get Related Articles

```http
GET /api/articles/:id/related
```

Get articles related to a specific article.

**Query Parameters:**
- `limit` (optional): Number of related articles to return (default: 5)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Related articles retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Related Article Title",
      "slug": "related-article-title",
      "summary": "Related article summary...",
      "thumbnail": "https://example.com/image.jpg"
    }
  ]
}
```

### Protected Endpoints (Admin Only)

#### Create Article

```http
POST /api/articles
```

Create a new article. Requires admin authentication.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Tiêu đề bài báo",
  "summary": "Tóm tắt bài báo...",
  "content": "Nội dung HTML...",
  "source": {
    "name": "VnExpress",
    "url": "https://vnexpress.net/abc.html"
  },
  "tags": ["60d21b4667d0d8992e610c86"],
  "category": "60d21b4667d0d8992e610c87",
  "thumbnail": "https://example.com/image.jpg",
  "publishedAt": "2023-06-22T10:30:00.000Z",
  "isCrawled": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Tiêu đề bài báo",
    "slug": "tieu-de-bai-bao",
    "summary": "Tóm tắt bài báo...",
    "content": "Nội dung HTML...",
    "source": {
      "name": "VnExpress",
      "url": "https://vnexpress.net/abc.html"
    },
    "tags": [
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Tag 1",
        "slug": "tag-1"
      }
    ],
    "category": {
      "_id": "60d21b4667d0d8992e610c87",
      "name": "Category 1",
      "slug": "category-1"
    },
    "thumbnail": "https://example.com/image.jpg",
    "publishedAt": "2023-06-22T10:30:00.000Z",
    "crawledAt": "2023-06-22T10:30:00.000Z",
    "isCrawled": true,
    "views": 0
  }
}
```

#### Update Article

```http
PUT /api/articles/:id
```

Update an existing article. Requires admin authentication.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "summary": "Updated summary...",
  "content": "Updated content...",
  "thumbnail": "https://example.com/new-image.jpg"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Article updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Updated Title",
    "slug": "updated-title",
    "summary": "Updated summary...",
    "content": "Updated content...",
    "source": {
      "name": "VnExpress",
      "url": "https://vnexpress.net/abc.html"
    },
    "tags": [
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Tag 1",
        "slug": "tag-1"
      }
    ],
    "category": {
      "_id": "60d21b4667d0d8992e610c87",
      "name": "Category 1",
      "slug": "category-1"
    },
    "thumbnail": "https://example.com/new-image.jpg",
    "publishedAt": "2023-06-22T10:30:00.000Z",
    "crawledAt": "2023-06-22T10:30:00.000Z",
    "isCrawled": true,
    "views": 1234
  }
}
```

#### Delete Article

```http
DELETE /api/articles/:id
```

Delete an article. Requires admin authentication.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Article deleted successfully",
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
  "message": "Article not found",
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