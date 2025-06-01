## 🔐 Authentication Patterns

## ✅ Stateful Authentication

- **Definition**: The server maintains the state of user sessions.
- **How it works**:
  - Client sends username & password.
  - Server validates and generates a **session ID**.
  - This session ID is stored **on the server** (e.g., in-memory, DB).
  - Server sends this session ID to the client (typically via a **cookie**).
  - On future requests, the client sends the session ID (via cookie), and the server looks it up to identify the user.

- **Analogy**:
  > A person wants to park a car. A **parking boy** parks the car and gives a **ticket number**.  
  > When the person returns and shows the ticket, the boy finds and returns the car.  
  > Here, the server maintains a map of ticket numbers to cars (sessions).

---

## ❌ Stateless Authentication

- **Definition**: The server does **not** maintain any session state.
- **How it works**:
  - Client sends credentials (or a token) with **every request**.
  - The server **validates the token** each time, usually using **JWT (JSON Web Tokens)**.
  - No need for server-side session storage.

- **Benefits**:
  - Scales easily (no need for centralized session storage).
  - Used in most RESTful APIs.

---

## 🔄 How to Transfer UID (Session ID / Token)

- Via **Cookies**
  - Sent automatically with each request to the same domain.
  - Good for browser-based authentication.

- Via **Headers**
  - Typically using `Authorization` header:  
    `Authorization: Bearer <token>`
  - Common in REST APIs and mobile clients.

- Via **Response Body** (not recommended for session continuation)

---

## 🛠 Express Authentication Flow

1. **Client** sends request (e.g., login).
2. **Express server** has a **middleware** that:
   - Checks for session ID or token in **headers** (or cookies).
   - Validates the token/session.
3. If valid → request proceeds to route handler.
4. If invalid → response with `401 Unauthorized`.

---

## 🧠 Summary

| Pattern     | Server Maintains State? | Common Usage         |
|-------------|--------------------------|-----------------------|
| Stateful    | ✅ Yes                   | Web apps (login sessions) |
| Stateless   | ❌ No                    | REST APIs, Mobile apps |