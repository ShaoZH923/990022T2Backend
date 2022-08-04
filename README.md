# 990022T2Backend
Backend development for UNSW COMP9900 22T2 glhf

## Framework Used
### Koa.JS

## Features
- Express-style routing (app.get, app.put, etc.)
- Named URL parameters
- Named routes with URL generation
- Multiple route middleware
- **async/await** support

## Installation
```
# install dependencies needed to run the server
npm install

# start the server
npm start
```

## Automated Testing
```
# if dependencies are not installed yet
npm install

# run unit tests
npm test
```

## Program Structure
### Route Middleware
    ./app.js
### URL generation
    ./routes/[Program Name].js
- Create new router object
- Create HTTP operation and URLs for the function.
### HTTP Request Processing
    ./application/[Function category]/[Category]_management.js
- Receive and process HTTP REQUEST
- Extract transmitted json object and send the object to controller function
- Acquire result from controller function
- Send HTTP RESPONSE
### Controller Functions
    ./application/controller/[database name]Controller.js
- Controls the logic of all URLs' functions
- Send requests and receive results from database manipulating functions
- Filter and pick the correct information and return to management functions
### Database Operation Functions
    ./application/model/[database name].js
- Sends SQL requests to the database
- Return SQL results to controller functions
### Database information
    ./application/model/entity/[database name].js
- Stores the structure of database tables
- Includes: columns' names and properties (Data type, primary key, not null, etc.).
- Dependency used: **Sequelize**
### Development Configuration
    ./config/dev.js
- Stores database access information
- Stores encryption keys (if needed)

## Contributors
| Name        | zID       |
|-------------|-----------|
| Ziheng Shao | z5300917  |