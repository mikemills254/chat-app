# Chat App Server

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

## Introduction

This repository contains the server-side code for the Chat App, which is built using Express.js. The server handles user authentication and messaging functionalities for seamless communication between agents and clients.

## Features

- User registration with username, email, and password
- User authentication using JWT tokens
- Account deletion
- Messaging functionality for agents and clients
- Real-time messaging using Socket.io

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app-server.git

2 **Navigate to the project directory:**
    ```bash
    cd trai-agencies-api

3. **Install dependencies:**
    ```bash
    npm install

4. **Create a .env file in the project root and add the following environment variables:**
    ```bash
    PORT=8000
    DB_URI=mongodb://your-mongodb-uri
    JWT_SECRET=your-jwt-secret

5. **Start the server:**
    ```bash
    npm start

## Usage

1. Make sure to have MongoDB installed and running.
2. Use a tool like Postman or a web browser to interact with the API.
3. Register a user, obtain a JWT token, and include it in the cookies for authenticated requests.

```markdown
# Chat App Server

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

## Introduction

This repository contains the server-side code for the Chat App, which is built using Express.js. The server handles user authentication and messaging functionalities for seamless communication between agents and clients.

## Features

- User registration with username, email, and password
- User authentication using JWT tokens
- Account deletion
- Messaging functionality for agents and clients
- Real-time messaging using Socket.io

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd chat-app-server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add the following environment variables:
   ```plaintext
   PORT=8000
   DB_URI=mongodb://your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

1. Ensure MongoDB is installed and running.
2. Use tools like Postman or a web browser to interact with the API.
3. Register users, login to obtain JWT tokens, and use them for authenticated requests.

## Endpoints

- **POST /login**: User login
- **POST /register**: User registration
- **POST /agent/register**: Agent registration
- **GET /user/:id**: Get information about a specific user
- **POST /sendMessage**: Send message from client to agent
- **GET /message**: Get all messages
- **POST /message/:id**: Update message status
- **GET /message/:id**: Get specific message details
- **POST /response**: Send response from agent to client
- **GET /agents**: Get information about all agents

## Dependencies

- **bcrypt**: Password hashing library
- **body-parser**: Middleware for parsing request bodies
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **dotenv**: Module for loading environment variables from a .env file
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens
- **mongodb**: Official MongoDB driver
- **mongoose**: MongoDB object modeling tool
- **nodemon**: Utility for automatically restarting the server

