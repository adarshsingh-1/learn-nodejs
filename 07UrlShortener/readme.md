## 🔐 What is JWT and How It's Used for Stateless Authentication?

**JWT (JSON Web Token)** is a compact, URL-safe token format used for securely transmitting information between parties as a **JSON object**.

## 📌 Why JWT for Stateless Authentication?

In **stateless authentication**, the server does **not maintain any session** information. Instead, all user authentication data is stored on the **client-side** inside a **JWT**, which is sent with each request.

## ✅ How JWT Works (Step-by-Step)

1. **User Logs In**:
   - Client sends username and password to the server.

2. **Server Verifies Credentials**:
   - If valid, the server **generates a JWT** containing the user info (like user ID).

3. **Token is Sent to Client**:
   - The JWT is sent back to the client via:
     - HTTP response
     - Or set as an **HTTP-only cookie**

4. **Client Stores the JWT**:
   - Stored in **LocalStorage**, **SessionStorage**, or cookies.

5. **On Future Requests**:
   - Client sends the token with each request in the Authorization header:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```

6. **Server Validates the Token**:
   - The server checks the **signature** and **payload** of the JWT.
   - If valid, it allows access without querying any session storage.

## 🧾 Structure of a JWT

A JWT has 3 parts separated by dots (`.`):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Parts Breakdown:

- **Header**: Algorithm & token type
- **Payload**: Data (e.g., user ID, role, expiration)
- **Signature**: Ensures token integrity

### Example Decoded:

**Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload:**
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

**Signature:**
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

## 🛡️ Benefits of JWT

- ✅ **Stateless** — No server-side session storage needed.
- ✅ **Scalable** — Suitable for microservices and distributed systems.
- ✅ **Secure** — Tamper-proof with signature verification.
- ✅ **Cross-Domain** — Works across different domains and services.
- ✅ **Self-Contained** — All necessary information is in the token.

## ⚠️ JWT Security Tips

- Always **sign** tokens with a strong secret key.
- Set **expiry (exp)** to avoid long-lived tokens.
- Store in **HTTP-only cookies** to prevent XSS attacks.
- Use **HTTPS** to protect against MITM attacks.
- Implement **token refresh** mechanism for better security.
- Never store sensitive data in the payload (it's base64 encoded, not encrypted).
- Consider **token blacklisting** for logout functionality.

## 🔄 JWT vs Session-Based Authentication

| Aspect | JWT | Session-Based |
|--------|-----|---------------|
| **Storage** | Client-side | Server-side |
| **Scalability** | High (stateless) | Limited (requires shared storage) |
| **Memory Usage** | Low server memory | High server memory |
| **Revocation** | Complex | Easy |
| **Size** | Larger (token overhead) | Smaller (session ID) |

## 🚀 Common Use Cases

- **Single Sign-On (SSO)**
- **API Authentication**
- **Microservices Communication**
- **Mobile Applications**
- **Distributed Systems**

---

*Need an example implementation using JWT in a Node.js app with Express? Let me know!*