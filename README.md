# Final-Team-Project-Backend
Backend for final team project

1. MVC (Model-View-Controller) pattern
2. Structure
* app.js = is the main entry point of your application
* server.js = imports the app.js and starts the server on port 3000.
* routes/api/ = API routes.
* controllers/... = controller function responsible for sending response
* middlewares/ctrlWrapper.js = a wrapper middleware function that handles the try-catch block for each controller.
* models/ = defines the data model for contacts and provides functions to interact with the data
* services/... = part of the services layer and returns data to controllers