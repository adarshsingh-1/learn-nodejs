## What is Nodejs
**Answer**    
Nodejs is a enviroment for executing javascript code with out the help browser engine or Runtime enviroment for js

## Why Nodejs
**Answer**    
- You can run JS outside of the browser
- Javascript can talk to native machines because of c++
- You can create webserver in JavaScript Language

### Difference Between LTS and Current in Node.js

## 1. LTS (Long-Term Support)
- **Definition**: LTS stands for Long-Term Support(Even). It is a version of Node.js that receives active support and critical bug/security fixes for an extended period (usually 30 months).
- **Stability**: More stable and tested; suitable for production environments.
- **Update Frequency**: Updated less frequently with only essential patches.
- **Target Users**: Recommended for enterprise and production use.

### 2. Current
- **Definition(Odd)**: The latest feature release of Node.js with the most up-to-date features and updates.
- **Stability**: Less stable than LTS; might include experimental or breaking changes.
- **Update Frequency**: Updated more frequently with new features.
- **Target Users**: Ideal for developers who want to try the newest features or contribute to Node.js development.

### Example:
| Version Type | Use Case                  | Update Frequency | Support Duration |
|--------------|---------------------------|------------------|------------------|
| LTS          | Production Applications    | Low              | ~30 months       |
| Current      | Testing New Features       | High             | ~6 months        |

> 🟢 **Tip**: Use LTS for production and Current for development/testing.


## Does Installing Node.js Also Install npm?

Yes, when you install **Node.js**, you get **npm (Node Package Manager)** by default.

### ✅ What You Get:
- **Node.js**: The JavaScript runtime environment.
- **npm**: The default package manager for Node.js used to install packages/modules.

### 📦 Why npm Comes with Node.js:
- npm is essential for managing JavaScript packages.
- Most Node.js projects rely on npm to install and manage dependencies.

### 🔍 How to Check After Installation:

Open your terminal and run:

```bash
node -v   # To check Node.js version
npm -v    # To check npm version
```


## . Why They Are Not in Node.js?
- Node.js is a **server-side runtime**, not a browser.
"they" in this context means the browser-specific features—specifically, the window object and DOM APIs—that are not present or needed in Node.js.
- It **does not have access to the browser environment**.
- Since there is **no webpage or GUI**, there is no need for:
  - `window` object
  - DOM APIs
  

## 🔧 4. What Node.js Has Instead
- Node.js has its own global object called `global`, not `window`.
- It provides server-side features like:
  - File system access (`fs`)
  - HTTP server creation
  - Process handling (`process`)

## What is `npm init`?

### 🧾 Definition:
`npm init` is a command used to **initialize a new Node.js project** by creating a `package.json` file.

### 📦 What is `package.json`?
- It is the **configuration file** for your Node.js project.
- Contains metadata like:
  - Project name
  - Version
  - Description
  - Entry point (e.g., `index.js`)
  - Scripts (e.g., `start`, `test`)
  - Dependencies

### 🛠️ How to Use:

### 1. Interactive Initialization:
```bash
npm init
```

## 📦 What is in a `package.json` File?

`package.json` is the **heart of any Node.js project**. It contains important metadata and configuration for your application and dependencies.

---

## 🧾 Common Fields in `package.json`

### 1. `name`
- The name of your project/package.
```json
"name": "my-app"
```

## 📁 Difference Between `.`, `./`, and `../`

| Symbol  | Meaning                         | Use Case Example              |
|---------|----------------------------------|-------------------------------|
| `.`     | Current directory                | `cd .` → stay in same folder |
| `./`    | Current directory (for files)    | `node ./app.js`              |
| `../`   | Parent directory (one level up)  | `cd ../` → go up one folder  |

### 🔹 Examples:

- `node ./index.js` → Run `index.js` in the current folder  
- `cd ../project2` → Move to sibling folder `project2`

> 📌 Use `./` when referring to files, `../` to go up a directory.

## 📦 What is a Module in Node.js?

### ✅ Definition:
A **module** is a **reusable block of code** in Node.js. Each file in Node.js is treated as a **separate module**.

- Modules help organize code into smaller, manageable parts.
- They can export functions, objects, or variables.
- You can import (reuse) them in other files using `require`.

---

## 📥 What is `require` in Node.js?

### ✅ Definition:
`require` is a built-in Node.js function used to **import modules** into your file.

```js
const fs = require('fs'); // Importing built-in module
const myUtils = require('./utils.js'); // Importing local module
```

## ✍️ Difference Between `fs.writeFile` and `fs.writeFileSync` in Node.js

### 1. `fs.writeFile` (Asynchronous)
- Writes data to a file **asynchronously**.
- Non-blocking: does not wait for the file to finish writing.
- You provide a **callback function** to handle errors or confirmation.

### ✅ Example:
```js
const fs = require('fs');

fs.writeFile('data.txt', 'Hello async!', (err) => {
  if (err) throw err;
  console.log('File written asynchronously');
});
```

### 2. `fs.writeFileSync` (Synchronous)

- Writes data to a file **synchronously**.
- **Blocking**: waits until the file is fully written before moving on to the next line.
- No **callback** needed — use `try...catch` for error handling.

### ✅ Example:
```js
const fs = require('fs');

try {
  fs.writeFileSync('output.txt', 'This is written synchronously!');
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err);
}
```

# Node.js Server Architecture

## Request Flow Overview

```
Request → Event Queue → Event Loop → Response
```

## Event Loop Mechanism

The **Event Loop** is the heart of Node.js that:
- Continuously monitors the **Event Queue**
- Picks up requests one by one (ek-ek krke)
- Determines whether operations are blocking or non-blocking
- Manages the execution flow

## Two Types of Operations

### 1. Non-Blocking Operations
- **Execution**: Executed immediately on the spot
- **Examples**: 
  - Simple calculations
  - Memory operations
  - Synchronous code execution
- **Characteristics**:
  - Don't block the event loop
  - Return results immediately
  - Keep the server responsive

### 2. Blocking Operations
- **Execution Flow**: 
  ```
  Blocking Operation → Thread Pool → Background Threads → Callback
  ```
- **Process**:
  1. Event loop identifies blocking operation
  2. Delegates to **Thread Pool**
  3. Background **threads** handle the operation
  4. Once complete, callback is added back to event queue
  5. Event loop picks up the callback and executes it

- **Examples**:
  - File system operations (fs.readFile)
  - Database queries
  - Network requests
  - Crypto operations

## Thread Pool

- **Purpose**: Handle blocking operations without blocking the main event loop
- **Default Size**: Usually 4 threads (can be configured)
- **Responsibility**: Execute I/O intensive and CPU intensive blocking operations
- **Benefit**: Keeps the main event loop free to handle other requests

## Key Benefits

1. **Single-threaded** main event loop for handling requests
2. **Multi-threaded** background processing for blocking operations
3. **High concurrency** with efficient resource utilization
4. **Non-blocking I/O** keeps server responsive

## Architecture Diagram

```
┌─────────────┐
│   Request   │
└─────┬───────┘
      │
┌─────▼───────┐
│ Event Queue │
└─────┬───────┘
      │
┌─────▼───────┐
│ Event Loop  │
└─────┬───────┘
      │
┌─────▼───────┐
│  Operation  │
│    Type?    │
└─────┬───────┘
      │
   ┌──▼──┐
   │     │
┌──▼──┐ ┌▼────────┐
│Non- │ │Blocking │
│Block│ │Operation│
│ing  │ └┬────────┘
└─────┘  │
         │
    ┌────▼─────┐
    │Thread    │
    │Pool      │
    └┬─────────┘
     │
┌────▼─────┐
│Background│
│Threads   │
└──────────┘
```

This architecture allows Node.js to handle thousands of concurrent connections efficiently while maintaining responsiveness.

