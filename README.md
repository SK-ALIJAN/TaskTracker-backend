# Task Tracker Backend API Documentation

Welcome to the Task Tracker Backend API documentation. This API is designed to support a todo application, providing endpoints to manage users and todos.

## Base URL

The base URL for the API is [https://task-tracker-backend-azure.vercel.app/](https://task-tracker-backend-azure.vercel.app/)

## Endpoints
****************************************************************************************

### 1. Home Page

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Returns a simple message indicating the home page.
- **Example:** 
  ```bash
  curl https://task-tracker-backend-azure.vercel.app/
  
****************************************************************************************

### 2. Create User

- **Endpoint:** `/user`
- **Method:** `POST`
- **Description:** Creates a new user for the todo app. Requires the name and email fields. Returns a JWT token upon successful user creation.
- **Example:** 
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}' https://task-tracker-backend-azure.vercel.app/user
  
****************************************************************************************

### 3. Get Todos

- **Endpoint:** `/todo`
- **Method:** `GET`
- **Description:** Retrieves todos. Requires a valid JWT token in the header.
- **Example:** 
  ```bash
  curl -H "Authorization: Bearer YOUR_JWT_TOKEN" https://task-tracker-backend-azure.vercel.app/todo

****************************************************************************************

### 4. Create Todo

- **Endpoint:** `/todo`
- **Method:** `POST`
- **Description:** Creates a new todo. Requires a valid JWT token in the header.
- **Example:** 
  ```bash
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d '{"title": "New Todo", "description": "Do something important"}' https://task-tracker-backend-azure.vercel.app/todo

****************************************************************************************

### 5. Update Todo

- **Endpoint:** `/todo/:id`
- **Method:** `PATCH`
- **Description:** Updates an existing todo by ID. Don't need to add JWT token
- **Example:** 
  ```bash
  curl https://task-tracker-backend-azure.vercel.app/todo/:id
  
****************************************************************************************

### 6. Delete Todo

- **Endpoint:** `/todo/:id`
- **Method:** `DELETE`
- **Description:** Deletes an existing todo by ID. Don't requires a valid JWT token in the header.
- **Example:** 
  ```bash
  curl https://task-tracker-backend-azure.vercel.app/todo/:id

****************************************************************************************
  

 ### Note
 Make sure to replace YOUR_JWT_TOKEN with the actual JWT token obtained from the /user endpoint when making requests that require authentication.
 
 ****************************************************************************************
