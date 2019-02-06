const express = require('express');
const Brewery = require('../models/brewery');

const breweryRouter = express.Router();

breweryRouter.get('/:brew_id', (req, res) => {
  Brewery.findById(req.params.brew_id, (err, brew) => {
    if (err) {
      res.send(err);
    } else {
      res.json(brew);
    }
  })
})

breweryRouter.put('/:brew_id', (req, res) => {
  Brewery.findById(req.params.brew_id, (err, brew) => {
    if (err) {
      res.send(err);
    }

    brew.name = req.body.name;
    brew.rating = req.body.rating;

    brew.save((err, document) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(`Brewery posted!\n${document}`);
    })
  })
})

breweryRouter.delete('/:brew_id', (req, res) => {
  Brewery.deleteOne(
    {
      _id: req.params.brew_id
    },
    err => {
      if (err) {
        res.send(err);
      }
      res.send('You successfully deleted brewery: ' + req.params.brew_id);
    }
  )
})

breweryRouter.get('/', (req, res) => {
  Brewery.find((err, brews) => {
    if (err) {
      res.send(err);
    } else {
      res.json(brews);
    }
  })
})

breweryRouter.post('/', (req, res) => {
  let brew = new Brewery();
  brew.name = req.body.name;
  brew.address = req.body.address;
  brew.save((err, document) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(`Saved your ${document}.`);
    }
  })
})

breweryRouter.use('/', (req, res) => {
  res.send('Breweries are out there...');
});

module.exports = breweryRouter;