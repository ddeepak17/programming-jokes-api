# 🤣 Programming Jokes API

A simple and fun web application that allows users to **view, add, update, and delete programming jokes** through a RESTful API. Built with **Node.js**, **MySQL**, and a lightweight **HTML/CSS/JS frontend**, it demonstrates basic CRUD operations and API-driven dynamic UI updates.

---

## 🚀 Features

- 📋 View all jokes
- ➕ Add a new joke  
- ✏️ Update an existing joke  
- ❌ Delete a joke  
- 🔁 API-driven frontend updates via `fetch`
- ⚠️ JSON-based error handling

---

## 🛠️ Technologies Used

- **Node.js** – Backend runtime
- **Express.js** – REST API routing
- **MySQL** – Data storage
- **HTML/CSS/JavaScript** – Frontend interface
- **Fetch API** – Client-server communication

---

## ⚙️ Setup & Installation

### 1️⃣ Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install a MySQL environment (e.g., [MAMP](https://www.mamp.info/en/), XAMPP, or native MySQL)

### 2️⃣ Clone the Repository

```bash
git clone <repository-url>
cd programming-jokes-api
npm install
````

### 3️⃣ Set Up the Database

* Import the SQL file:
  `includes/db_dump.sql`
  into your local MySQL server.
* Update `includes/config.js` with your own DB credentials.

### 4️⃣ Run the Server

```bash
node server.js
```

By default, the server runs at:
`http://localhost:8000`

---

## 📡 API Endpoints

### 🔹 1. Fetch All Jokes

**GET** `/api/jokes`
Returns a list of all jokes.

```json
[
  {
    "id": 1,
    "content": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "author": "John Doe",
    "created_at": "2025-03-14T08:04:51.000Z"
  }
]
```

---

### 🔹 2. Fetch a Single Joke

**GET** `/api/jokes/:id`
Example:

```bash
GET http://localhost:8000/api/jokes/1
```

Response:

```json
{
  "success": true,
  "joke": {
    "id": 1,
    "content": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "author": "John Doe",
    "created_at": "2025-03-14T08:04:51.000Z"
  }
}
```

---

### 🔹 3. Add a New Joke

**POST** `/api/jokes`
Request Body:

```json
{
  "content": "New joke!",
  "author": "Alice"
}
```

Response:

```json
{
  "success": true,
  "message": "Joke added successfully",
  "jokeID": 17
}
```

---

### 🔹 4. Update a Joke

**PUT** `/api/jokes`
Request Body:

```json
{
  "id": 17,
  "content": "Updated joke text",
  "author": "Alice"
}
```

Response:

```json
{
  "success": true,
  "message": "Joke updated successfully"
}
```

---

### 🔹 5. Delete a Joke

**DELETE** `/api/jokes`
Request Body:

```json
{
  "id": 17
}
```

Response:

```json
{
  "success": true,
  "message": "Joke deleted successfully"
}
```

---

## 🧠 Author

**Darren Deepak**
Originally developed as a learning project to demonstrate backend API development, MySQL integration, and frontend communication using fetch.
