# Programming Jokes API

## Description
This is a simple web application that allows users to **view, add, update, and delete programming jokes** It is built using:
- **Node.js** (backend)
- **MySQL** (database)
- A provided **HTML/CSS/JS frontend** 

The backend follows an API that the frontend commuicatres with using `fetch` to dynamically update the joke list.

---

## Setup & Installation

### **1 Prerequisites**
- Install **[MAMP](https://www.mamp.info/en/)** (or any MySQL setup)
- Install **Node.js** and **npm**

### **2 Clone the Repository**
```bash
git clone <repository-url>
cd a3-node

## Features Implemented
 View all jokes
 Add a new joke  
 Update an existing joke  
 Delete a joke
 Proper JSON error handling
 Frontend integration with API using fetch  

Here’s the APIs Used and Their URLs section for your README.md file:

## API Endpoints

1 Fetch All Jokes

GET /api/jokes  
Response: 
```json
[
  {
    "id": 1,
    "content": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "author": "John Doe",
    "created_at": "2025-03-14T08:04:51.000Z"
  },
  ...
]


2 Fetch a Single Joke

GET /api/jokes/:id
Example:

GET http://localhost:8000/api/jokes/1

Response:

{
  "success": true,
  "joke": {
    "id": 1,
    "content": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "author": "John Doe",
    "created_at": "2025-03-14T08:04:51.000Z"
  }
}

3 Add a New Joke

POST /api/jokes/
Example:

Body (JSON):
{
  "content": "New joke!",
  "author": "Alice"
}

Response:
{
  "success": true,
  "message": "Joke added successfully",
  "jokeID": 17
}

4 Update a Joke

PUT /api/jokes
Example:

Body (JSON):
{
  "id": 17,
  "content": "Updated joke text",
  "author": "Alice"
}

Response:
{
  "success": true,
  "message": "Joke updated successfully"
}

5 Delete a Joke

DELETE /api/jokes
Example:

Body(JSON):
{
  "id": 17
}

Response:
{
  "success": true,
  "message": "Joke deleted successfully"
}

