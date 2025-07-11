# 🔐 JWT Authentication in Node.js
## Complete Step-by-Step Flow for Backend Developers

### 1. 🧾 User Logs In
User sends credentials to the authentication endpoint:
```javascript
POST /login
Content-Type: application/json

{
  "email": "user@example.com", 
  "password": "123456"
}
```

### 2. 🛠️ Server Validates & Creates JWT
```javascript
// Validate user credentials
const user = await User.findOne({ email });
const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

if (!isValidPassword) {
  return res.status(401).json({ error: "Invalid credentials" });
}

// Create JWT with payload
const payload = {
  userId: user._id,
  email: user.email,
  role: user.role  // Include role for authorization
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { 
  expiresIn: "24h",
  issuer: "your-app-name",
  audience: "your-app-users"
});
```

### 3. 📤 Server Sends Token to Client

#### ✅ Option 1: HTTP-Only Cookie (Recommended for Web Apps)
```javascript
res.cookie("authToken", token, {
  httpOnly: true,        // Prevents XSS attacks
  secure: true,          // HTTPS only
  sameSite: "Strict",    // CSRF protection
  maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
});

res.json({ 
  message: "Login successful",
  user: { id: user._id, email: user.email, role: user.role }
});
```

#### ✅ Option 2: Response Body (For Mobile/SPA)
```javascript
res.json({ 
  success: true,
  token: token,
  user: { id: user._id, email: user.email, role: user.role }
});
```

### 4. 🌐 Client Makes Request to Protected Route

#### If using Cookie:
```javascript
// Browser automatically sends cookie
GET /protected-route
Cookie: authToken=<jwt_token>
```

#### If using Authorization Header:
```javascript
// Client manually adds token to header
GET /protected-route
Authorization: Bearer <jwt_token>
```

### 5. 🔒 Server Middleware Validates Token
```javascript
const authenticateToken = (req, res, next) => {
  try {
    // Extract token from cookie or header
    const token = req.cookies.authToken || 
                  req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user info to request
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Usage in routes
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}!` });
});
```

## 🎯 Important Interview Points

### Security Best Practices
- **Environment Variables**: Store JWT secret in `.env` file, never hardcode
- **Strong Secret**: Use cryptographically strong secret (minimum 256 bits)
- **Token Expiration**: Always set reasonable expiration times
- **HTTPS Only**: Never send JWTs over HTTP in production
- **Input Validation**: Always validate and sanitize user inputs

### Token Storage Comparison
| Method | Security | Ease of Use | Mobile Support |
|--------|----------|-------------|----------------|
| HTTP-Only Cookie | ✅ High | ✅ Automatic | ❌ Limited |
| Authorization Header | ⚠️ Medium | ❌ Manual | ✅ Full |
| LocalStorage | ❌ Low | ✅ Easy | ✅ Full |

### Common JWT Structure
```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "userId": "64a7b8c9d1e2f3g4h5i6j7k8",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1672531200,  // Issued at
  "exp": 1672617600   // Expires at
}

// Signature (generated using secret)
```

### Error Handling Scenarios
```javascript
// Token expired
if (error.name === 'TokenExpiredError') {
  return res.status(401).json({ 
    error: "Token expired", 
    code: "TOKEN_EXPIRED" 
  });
}

// Invalid signature
if (error.name === 'JsonWebTokenError') {
  return res.status(403).json({ 
    error: "Invalid token", 
    code: "INVALID_TOKEN" 
  });
}

// Token malformed
if (error.name === 'SyntaxError') {
  return res.status(400).json({ 
    error: "Malformed token", 
    code: "MALFORMED_TOKEN" 
  });
}
```

### Refresh Token Pattern (Advanced)
```javascript
// Generate both access and refresh tokens
const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });

// Store refresh token in database
await RefreshToken.create({ 
  token: refreshToken, 
  userId: user._id,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});
```

### Authorization vs Authentication
- **Authentication**: "Who are you?" - Verifying user identity
- **Authorization**: "What can you do?" - Checking permissions

```javascript
// Role-based authorization middleware
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};

// Usage
app.delete('/admin/users/:id', authenticateToken, authorize(['admin']), deleteUser);
```

### Key Interview Questions to Prepare
1. **Why JWT over sessions?** Stateless, scalable, works across domains
2. **JWT vs OAuth?** JWT is a token format, OAuth is an authorization framework
3. **How to handle token expiration?** Refresh tokens, graceful error handling
4. **Security vulnerabilities?** XSS, CSRF, token leakage - explain mitigations
5. **Logout implementation?** Token blacklisting or short expiration times
6. **Scaling considerations?** Stateless nature allows horizontal scaling

### Production Checklist
- ✅ Use HTTPS in production
- ✅ Implement rate limiting on auth endpoints  
- ✅ Log authentication events for monitoring
- ✅ Use strong, random JWT secrets
- ✅ Implement proper error handling
- ✅ Add request validation and sanitization
- ✅ Consider implementing refresh token rotation