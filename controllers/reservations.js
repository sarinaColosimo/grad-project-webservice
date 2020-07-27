// Code in here does only HTTP logic for reservatioms; i.e defining endpoints and getting data out of the HTTP request

const express = require('express');
const reservationsService = require('../service/reservations');
const router = express.Router();

router.get('/reservations', function (req, res) {
  reservationsService.getAllReservations()
    .then((result) => {
      res.send(result);
    })
    .catch((errorResult) => {
      res.send(errorResult);
    });
});

router.get('/reservations/:id', function (req, res) {
  reservationsService.getAReservationById(req.params.id)
    .then((reservation) => {
      res.send(reservation);
    })
    .catch((errorResult) => {
      if (errorResult.reason === 'UNKNOWN') {
        res.status(500).send('Unknown error');
      } else if (errorResult.reason === 'NOT_FOUND') {
        res.status(404).send('Not found');
      }
    });
});

router.post('/reservations', function (req, res) {
  reservationsService.createReservation(req.body)
    .then((newReservation) => {
      res.status(201).send(newReservation);
    })
    .catch(() => {
      res.status(500).send('Unknown error');
    });
});


module.exports = router;