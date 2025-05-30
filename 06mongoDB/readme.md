## Starting With MongoDB

### Overview
- **No-SQL Document based Database**
- **Strong support for aggregation pipes**
- **Works on BSON format**
- **Best for node application**

### MongoDB Architecture
```
Database
├── Collection (e.g., "users")
    ├── Document-1
    ├── Document-2
    └── Document-n
```

## Starting MongoDB Server
```bash
sudo mongod --dbpath /Users/adarshsingh/data/db
```

## Basic MongoDB Commands

### Database Operations
```bash
# Show all databases
show dbs

# Create/Switch to a database
use <db_name>

# Show current database
db
```


## Starting With MongoDB

### Overview
- **No-SQL Document based Database**
- **Strong support for aggregation pipes**
- **Works on BSON format**
- **Best for node application**

### MongoDB Architecture
```
Database
├── Collection (e.g., "users")
    ├── Document-1
    ├── Document-2
    └── Document-n
```

## Starting MongoDB Server
```bash
sudo mongod --dbpath /Users/adarshsingh/data/db
```

## Basic MongoDB Commands

### Database Operations
```bash
# Show all databases
show dbs

# Create/Switch to a database
use <db_name>

# Show current database
db
```

## MVC Pattern in Node.js

### What is MVC?
**MVC (Model-View-Controller)** is an architectural pattern that separates application logic into three interconnected components.

### Components

#### 📊 Model
- Handles data logic and database operations
- Defines data structure and validation
- Interacts with MongoDB collections

#### 🎨 View
- Manages presentation layer (UI)
- Renders data to users
- Templates (EJS, Handlebars) or JSON responses

#### 🎮 Controller
- Intermediary between Model and View
- Handles HTTP requests/responses
- Contains business logic

### Example Structure
```
project/
├── models/
│   └── User.js
├── views/
│   └── users.ejs
├── controllers/
│   └── userController.js
└── routes/
    └── userRoutes.js
```

### Code Examples

#### Model
```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);
```

#### Controller
```javascript
// controllers/userController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
```

#### Routes
```javascript
// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.getAllUsers);
module.exports = router;
```

### Benefits
- **Separation of Concerns**
- **Maintainability**
- **Scalability**
- **Reusability**