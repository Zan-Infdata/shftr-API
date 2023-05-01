// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// define global root directory
var path = require('path');
global.__rootname = path.resolve(__dirname);

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


/**
 * API routing
 */
const apiRouter = require("./src/routes/api");
app.use("/", apiRouter);


// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});