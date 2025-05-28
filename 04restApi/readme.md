## RESTful API Complete Guide

## What is REST?

**REST** = **Representational State Transfer**

A set of architectural principles for designing web services that defines how resources should be accessed and manipulated over HTTP.

## Core Architecture

### Server-Client Communication

```
┌─────────────────┐    REQUEST     ┌─────────────────┐
│     CLIENT      │ ──────────────► │     SERVER      │
│ (Browser, App,  │                │ (Different      │
│  Phone, Alexa)  │ ◄────────────── │  Machine)       │
└─────────────────┘    RESPONSE    └─────────────────┘
```

**Key Points:**
- Server and client are on **different machines**
- Client sends **requests**
- Server returns **responses**
- Communication happens over HTTP

## Response Formats

### When to Use Each Format

| Client Type | Response Format | Use Case |
|-------------|-----------------|----------|
| **Browser Only** | HTML | Server-Side Rendering (SSR) |
| **Multiple Clients** | JSON | Mobile apps, Web apps, APIs |
| **Legacy Systems** | XML | Older enterprise systems |

### Response Format Examples

#### HTML Response (Browser-specific)
```http
GET /blog/123
Content-Type: text/html

<html>
  <head><title>My Blog Post</title></head>
  <body>
    <h1>Welcome to my blog</h1>
    <p>This is the blog content...</p>
  </body>
</html>
```

#### JSON Response (Universal)
```http
GET /api/blog/123
Content-Type: application/json

{
  "id": 123,
  "title": "My Blog Post",
  "content": "This is the blog content...",
  "author": "John Doe",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## HTTP Methods (Verbs)

### Proper RESTful Usage

| Method | Purpose | Example Endpoint | Description |
|--------|---------|------------------|-------------|
| **GET** | Read/Retrieve | `GET /users` | Get all users |
| **POST** | Create | `POST /users` | Create new user |
| **PUT** | Update (Complete) | `PUT /users/123` | Replace entire user |
| **PATCH** | Update (Partial) | `PATCH /users/123` | Update specific fields |
| **DELETE** | Remove | `DELETE /users/123` | Delete user |

### ✅ Correct RESTful Examples

```http
GET /users           # Get all users
GET /users/123       # Get specific user
POST /users          # Create new user
PUT /users/123       # Update entire user
PATCH /users/123     # Update user partially
DELETE /users/123    # Delete user

GET /posts           # Get all blog posts
POST /posts          # Create new post
GET /posts/456       # Get specific post
```

### ❌ Incorrect Non-RESTful Examples

```http
POST /updateUser     # Wrong: Should be PUT/PATCH /users/123
GET /deleteUser/123  # Wrong: Should be DELETE /users/123
POST /getUsers       # Wrong: Should be GET /users
GET /createUser      # Wrong: Should be POST /users
```




## HTTP Status Codes

### Common RESTful Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| **200** | OK | Successful GET, PUT, PATCH |
| **201** | Created | Successful POST |
| **204** | No Content | Successful DELETE |
| **400** | Bad Request | Invalid request data |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Access denied |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Internal server problem |

## Best Practices Summary

### ✅ Do This
- Use nouns for endpoints (`/users`, not `/getUsers`)
- Use HTTP methods properly
- Return consistent JSON structure
- Use proper status codes
- Design for multiple client types
- Use plural nouns for collections

### ❌ Avoid This
- Mixing verbs in URLs (`/updateUser`)
- Using GET for data modification
- Inconsistent response formats
- Ignoring HTTP status codes
- Designing only for browsers

## Real-World Example

### E-commerce API Structure

```http
# Products
GET    /api/products              # List all products
POST   /api/products              # Create product
GET    /api/products/123          # Get product details
PUT    /api/products/123          # Update product
DELETE /api/products/123          # Delete product

# Orders
GET    /api/orders                # List orders
POST   /api/orders                # Create order
GET    /api/orders/456            # Get order details

# User's Orders
GET    /api/users/789/orders      # Get orders for user 789
```

This RESTful design ensures your API is predictable, scalable, and works seamlessly across different client applications.