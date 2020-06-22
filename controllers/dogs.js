// Code in here does only HTTP logic for dogs; i.e defining endpoints and getting data out of the HTTP request

const express = require('express');
const dogsService = require('../service/dogs');
const router = express.Router();




router.get('/dogs', function (req, res) {
  dogsService.getAllDogs()
    .then((result) => {
      res.send(result);
    })
    .catch((errorResult) => {
      res.send(errorResult);
    });
});

router.get('/dogs/:id', function (req, res) {
  dogsService.getADogById(req.params.id)
    .then((dog) => {
      res.send(dog);
    })
    .catch((errorResult) => {
      if (errorResult.reason === 'UNKNOWN') {
        res.status(500).send('Unknown error');
      } else if (errorResult.reason === 'NOT_FOUND') {
        res.status(404).send('Not found');
      }
    });
});

router.post('/dogs', function (req, res) {
  dogsService.createDog(req.body)
    .then((newDog) => {
      res.status(201).send(newDog);
    })
    .catch(() => {
      res.status(500).send('Unknown error');
    });
})

module.exports = router;
