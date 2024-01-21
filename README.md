# Final-Team-Project-Backend

Backend for the Slimmom application

## Table of Contents
1. [Overview](#overview)
2. [Structure](#structure)
3. [Features](#features)
4. [Meet the Team](#meet-the-team)
5. [Technology Stack](#technology-stack)

## Overview
Slimmom is a web application designed to support mothers in maintaining a healthy lifestyle. The backend of Slimmom is responsible for handling data storage, processing, and managing API routes to provide seamless functionality to the frontend.

## Structure
The backend follows the MVC (Model-View-Controller) pattern for a well-organized and scalable architecture. Here's a brief overview of the directory structure:

- **app.js**: Main entry point of the application.
- **server.js**: Imports app.js and starts the server.
- **routes/api/**: Contains API routes for the application.
- **controllers/**: Houses controller functions responsible for sending responses.
- **middlewares/ctrlWrapper.js**: A wrapper middleware handling try-catch blocks for each controller.
- **models/**: Defines data models for databases and provides functions to interact with the data.
- **services/**: Part of the services layer, returning data to controllers.

## Features
The backend of Slimmom supports the following features:

1. **API Routes**: Well-defined routes in the `routes/api/` directory to handle various functionalities.
2. **Controllers**: Controllers in the `controllers/` directory to process requests and send appropriate responses.
3. **Middleware**: `ctrlWrapper.js` ensures a consistent try-catch block handling mechanism for controllers.
4. **Models**: Data models defined in the `models/` directory for interacting with the database.
5. **Services**: Services in the `services/` directory responsible for providing data to controllers.

## Meet the Team
Slimmom is the result of collaborative efforts from a skilled and dedicated team. Each member contributed to different aspects of the project:

- **Rachel Fredrickson (Scrum Master)**: Logo design, registration (frontend and backend).
- **Jose Gonzales (Team Lead)**: Repository management/archetecture, Heroku deployment, Swagger documentation, general contributions and support.
- **Amira A**: Diary List and Diary Foods Search development, backend routes.
- **Jim Lynch**: Calculator (frontend and backend).
- **Alexandra Pavliukova**: Diary Calendar and Diary Form development, backend routes.
- **Anton Pavlov**: Daily Rate Modal, Sidebar (Summary & Stats) development, backend routes.
- **Stefie Caffarel**: Header, user toolbar, layouts design, backend routes.
- **Jen Martinez**: Login form and login page development (frontend and backend).

## Technology Stack
Slimmom leverages a diverse set of technologies and tools for its development:

- **Frontend**: JavaScript, React, MUI.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **State Management**: Redux-Toolkit.
- **Deployment**: Frontend - GitHub Pages, Backend - Heroku.
- **API Documentation**: Swagger.
