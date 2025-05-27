## Why Express.js?

Working with Node.js's native `http` module becomes tedious and messy as the app grows. Express.js provides a simple and clean way to build web servers and APIs.

---

## 🤯 Problem with `http.createServer()`

Example:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end('Home Page');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.end('About Page');
  } else {
    res.end('Not Found');
  }
});

server.listen(3000);
```
## ❌ Problems with Native Node.js (`http` module)

- Manual routing using `if-else` or `switch`
- No built-in support for parsing JSON, query parameters, etc.
- Complex and repetitive for larger applications
- Messy code structure

---

## ✅ Why Use Express.js?

Express.js simplifies server development and reduces boilerplate code.

---

### 💡 Example: Express.js Code

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### BASIC ROUTING SYNTAX
**app.METHOD(PATH, HANDLER)**
- app: your Express application instance
- METHOD: HTTP method like get, post, put, etc.
- PATH: URL endpoint (e.g., /, /users)
- HANDLER: callback function (req, res)

#### Example:
```jsx
app.get('/login', (req, res) => {
  res.send('Login Page');
});
```


## 📊 Node.js vs Express.js Feature Comparison

| Feature          | Without Express (`http`) | With Express          |
|------------------|---------------------------|------------------------|
| **Routing**       | Manual (`if/switch`)      | `app.get()`, `app.post()` |
| **Middleware**    | Complex setup             | Easy via `app.use()`   |
| **Body Parsing**  | Manual logic              | Built-in (`express.json()`) |
| **Static Files**  | Custom code required      | `express.static()`     |
| **Code Cleanliness** | ❌                        | ✅                      |
---


## NPM Version Management Guide

### Semantic Versioning (SemVer)

### Version Format: `MAJOR.MINOR.PATCH`

**Example**: `"express": "^5.1.0"`

- **1st part (5)** → Major Version
- **2nd part (1)** → Minor Version  
- **3rd part (0)** → Patch Version

### Version Types Explained

| Part | Type | Description | Example |
|------|------|-------------|---------|
| **MAJOR** | Breaking Changes | Incompatible API changes | `5.x.x` → `6.0.0` |
| **MINOR** | New Features | Backward-compatible functionality | `5.1.x` → `5.2.0` |
| **PATCH** | Bug Fixes | Backward-compatible bug fixes | `5.1.0` → `5.1.1` |

## Version Range Symbols

### Caret (^) - Compatible Within Major Version
```json
"express": "^5.1.0"
```
- **Allows**: `5.1.0` up to `< 6.0.0`
- **Updates**: Minor and patch versions automatically
- **Example Range**: `5.1.0`, `5.1.5`, `5.2.1`, `5.9.0` ✅
- **Blocks**: `6.0.0` and above ❌

### Tilde (~) - Approximately Equivalent
```json
"express": "~5.1.0"
```
- **Allows**: Only patch-level updates
- **Example Range**: `5.1.0`, `5.1.1`, `5.1.9` ✅
- **Blocks**: `5.2.0` and above ❌

### Exact Version (No Symbol)
```json
"express": "5.1.0"
```
- **Allows**: Only that exact version
- **No automatic updates**

## Practical Examples

### Caret Behavior Over Time
Starting with: `"express": "^5.1.0"`

Auto-updates to:
- `5.1.5` (patch fixes)
- `5.2.1` (minor features + security updates)
- `5.10.9` (more minor updates)
- `5.30.9` (latest in 5.x series)

**Never updates to**: `6.0.0` (major breaking changes)

## Installing Specific Versions

### Install Exact Version
```bash
npm install express@17.2.4
```

### Install Latest Version
```bash
npm install express@latest
```

### Install Within Range
```bash
npm install express@^5.1.0
npm install express@~5.1.0
```

## Quick Reference

| Symbol | Name | Updates | Example |
|--------|------|---------|---------|
| `^5.1.0` | Caret | Minor + Patch | `5.1.0` → `5.9.9` |
| `~5.1.0` | Tilde | Patch only | `5.1.0` → `5.1.9` |
| `5.1.0` | Exact | None | `5.1.0` only |
| `*` | Wildcard | All | Latest available |

## Best Practices

- **Use `^`** for most dependencies (recommended updates + security fixes)
- **Use `~`** for critical dependencies where stability is crucial
- **Use exact versions** for deployment environments
- **Always test** before updating major versions manually