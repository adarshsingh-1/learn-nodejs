### 🌐 URL Components Explained

**URL:** `https://www.adarshsingh.dev/about`

Let's break it down:

- **Protocol:** `https`  
  Specifies the communication protocol. `https` stands for **HyperText Transfer Protocol Secure**, which means the data is encrypted.

- **Domain:** `www.adarshsingh.dev`  
  This is the **unique name** of the website that identifies it on the internet.

- **Path:** `/about`  
  The path tells the server **which specific page or resource** to load on the website.

---

### 🌐 URL Components with Nested Paths & Query Parameters

#### Example 1: Nested Path  
**URL:** `https://www.adarshsingh.dev/project/tic-tac-toe`

- **Protocol:** `https`
- **Domain:** `www.adarshsingh.dev`
- **Path:** `/project/tic-tac-toe`  
  This is a **nested path** indicating that the user is viewing the **tic-tac-toe** project under the **project** section.

---

#### Example 2: Query Parameters  
**URL:** `https://adarshsingh.dev/about?userId=1&a=2`

- **Domain:** `adarshsingh.dev`
- **Path:** `/about`
- **Query Parameters:** `?userId=1&a=2`  
  These are **key-value pairs** used to pass data to the server:
  - `userId=1`
  - `a=2`

Query parameters always start with `?` and are separated by `&`.

---

#### 🔍 Summary:
- **Nested Path** helps structure the content (like subfolders).
- **Query Parameters** pass dynamic data through the URL.

---

## HTTP Methods

### 🔁 HTTP Methods: GET vs POST

#### 📥 HTTP GET  
**When to use:** When you want to **get data from the server**.

- **GET Request:**  
  Server ke database mein jaa kar **data read karta hai**  
  Jo bhi data milta hai, wo client ko **send** kar diya jaata hai.

- **Example Use Cases:**  
  - Fetching user profile  
  - Loading a blog post  
  - Getting product details

---

#### 📤 HTTP POST  
**When to use:** When you want to **send and mutate data on the server**.

- **POST Request:**  
  Client se data **send** kiya jaata hai (jaise form inputs),  
  aur server us data ko **process ya store** karta hai.

- **Example Use Cases:**  
  - Submitting a login or signup form  
  - Creating a new blog post  
  - Sending feedback or contact form


### 🔄 HTTP Methods: PUT vs PATCH

#### 📤 HTTP PUT  
**When to use:** When you want to **upload or replace** an entire resource.

- **PUT Request:**  
  Server par **poora data replace** hota hai.  
  Often used for **file uploads** or replacing a record.

- **Example Use Cases:**  
  - Uploading a profile photo  
  - Replacing a complete user profile

---

#### ✏️ HTTP PATCH  
**When to use:** When you want to **update only part of existing data**.

- **PATCH Request:**  
  Sirf **specific fields update** hote hain, poora resource nahi.  
  More efficient for small updates.

- **Example Use Cases:**  
  - Updating user name or email only  
  - Changing post title without touching content

---


#### ❌ HTTP DELETE  
**When to use:** To **delete a resource** from the server.

- **DELETE Request:**  
  Server se **resource ko permanently remove** karta hai.

- **Example:** Deleting a user account or removing a comment.


