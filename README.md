### To run USER_API:

- create .env file in the API folder

- set DATABASE_URI to MongoDB server connection string
- set port in api_server.js

- install dependencies with `npm install` in API folder and use node js to run `node api_server.js`

### To use API

User api runs on localhost:port/users

A get request to /users will get all information of all users

A get request to /users/id will return the information for the user with that id if they exist

A POST request to /users will create a user if you have a username and password field in the json body of the request

A PATCH request to /users/id will update the information of that user based on a json body passed

A DELETE request to the /users/id will delete the user with that account if they exist
