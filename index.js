const express = require('express');
const beerRouter = require('./routes/beerRouter');
const breweryRouter = require('./routes/breweryRouter');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////////////////////////////////////

app.use('/api/beers', beerRouter); // mount beerRouter

app.use('/api/breweries', breweryRouter); // mount breweryRouter

app.use('/', (req, res) => {
  res.send('Hello!');
});

///////////////////////////////////

const mongoose = require('mongoose');

// beers database
mongoose.connect('mongodb://localhost:27017/beers', { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to "beers" database');
});
mongoose.connection.on('error', err => {
  console.log(`Got an error!:\n${err}`);
});

// breweries database
// mongoose.connect('mongodb://localhost:27017/breweries', {
//   useNewUrlParser: true
// });
// mongoose.connection.on('connected', () => {
//   console.log('Connected to "breweries" database');
// });
// mongoose.connection.on('error', err => {
//   console.log(`Got an error!:\n${err}`);
// });

const port = process.env.PORT || 4444;

app.listen(port);
console.log(`Listening on ${port}.`);
