const express = require("express");
const bodyParser = require("body-parser");
const dogsController = require('./controllers/dogs');
const reservationsController = require('./controllers/reservations');
const reviewsContoller = require('./controllers/reviews');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(dogsController);

app.use(reservationsController);

app.use(reviewsContoller);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});

app.use(bodyParser.json());