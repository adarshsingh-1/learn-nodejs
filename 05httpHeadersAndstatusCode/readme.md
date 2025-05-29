## HTTP Headers - Complete Notes

## What are HTTP Headers?

HTTP Headers are like **postal mail metadata** - just as a mail envelope contains additional information (sender, receiver, weight, etc.) along with the actual letter, HTTP headers contain metadata along with the actual data being transmitted.

## Key Concepts

### 📧 Mail Analogy
- When sending a mail to a friend through any postal service
- The mail packet contains:
  - **Original Data**: The actual letter/content
  - **Additional Information**: From address, To address, packet weight, etc.
- Similarly, HTTP requests/responses have headers with metadata

### 🌐 HTTP Headers Definition
- **Important part** of API requests and responses
- Represent **meta-data** associated with API request and response
- Carry information for both **Request Body** and **Response Body**

## Types of Headers

### Request Headers
- Sent by client to server
- Contains information about the request
- Examples: User-Agent, Accept, Authorization

### Response Headers
- Sent by server to client
- Contains information about the response
- Examples: Content-Type, Set-Cookie, Cache-Control

## How to Inspect Headers

### Using Browser Developer Tools
1. Go to any website (e.g., `youtube.com`)
2. Right-click and select **Inspect** (or press F12)
3. Navigate to **Network** tab
4. Reload the page
5. Click on any request
6. View **Headers** section to see:
   - **Request Headers**
   - **Response Headers**

## Common Header Examples

### Request Headers
```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Content-Type: application/json
Authorization: Bearer token123
```

### Response Headers
```
Content-Type: application/json
Content-Length: 1234
Set-Cookie: sessionid=abc123
Cache-Control: no-cache
```

## Why Headers Matter

1. **Authentication**: Authorization headers for security
2. **Content Negotiation**: Accept headers specify desired format
3. **Caching**: Cache-Control headers manage caching behavior
4. **Security**: Various security-related headers
5. **Debugging**: Help identify issues in API communication

## Best Practices

- Always include appropriate `Content-Type` headers
- Use security headers for protection
- Set proper cache headers for performance
- Include meaningful custom headers when needed
- Validate and sanitize header values

---

**Note**: Headers are crucial for proper API communication and should be carefully configured for optimal performance and security.

Status Code 


// ...existing code...

## HTTP Status Codes

HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped into five classes:

### 📊 Status Code Categories

| Range | Category | Description |
|-------|----------|-------------|
| **100-199** | Informational responses | Request received, continuing process |
| **200-299** | Successful responses | Request successfully received and processed |
| **300-399** | Redirection messages | Further action needed to complete request |
| **400-499** | Client error responses | Request contains bad syntax or cannot be fulfilled |
| **500-599** | Server error responses | Server failed to fulfill valid request |

### ✅ 2xx Successful Responses

- **200 - OK**: Request succeeded
- **201 - Created**: Request succeeded and a new resource was created as a result
- **202 - Accepted**: Request has been received but not yet acted upon
- **204 - No Content**: Request succeeded but no content to send for this request

### ❌ 4xx Client Error Responses

- **400 - Bad Request**: Something missing or invalid in request
- **401 - Unauthorized**: Authentication required or failed
- **402 - Payment Required**: Payment required to access resource
- **403 - Forbidden**: Server understood request but refuses to authorize it (access नहीं है)
- **404 - Not Found**: Requested resource could not be found

### 🔄 3xx Redirection Messages

- **301 - Moved Permanently**: Resource has been permanently moved
- **302 - Found**: Resource temporarily moved to different URL
- **304 - Not Modified**: Resource has not been modified since last request

### ⚠️ 5xx Server Error Responses

- **500 - Internal Server Error**: Server encountered unexpected condition
- **501 - Not Implemented**: Server does not support functionality required
- **502 - Bad Gateway**: Server received invalid response from upstream server
- **503 - Service Unavailable**: Server is not ready to handle request

### 📝 Common Use Cases

```javascript
// Setting status codes in Node.js
res.status(200).json({ message: "Success" });           // OK
res.status(201).json({ message: "User created" });      // Created
res.status(400).json({ error: "Invalid input" });       // Bad Request
res.status(404).json({ error: "User not found" });      // Not Found
res.status(500).json({ error: "Server error" });        // Internal Server Error
```

### 🎯 Best Practices

1. **Use appropriate status codes** for different scenarios
2. **Be consistent** with status code usage across your API
3. **Include meaningful error messages** with 4xx and 5xx responses
4. **Use 201** for successful resource creation
5. **Use 204** for successful operations with no response body

---

**Note**: Proper status codes help clients understand the result of their requests and handle responses appropriately.