// Code in here does only HTTP logic for reviews; i.e defining endpoints and getting data out of the HTTP request

const express = require('express');
const reservationsService = require('../service/reviews');
const router = express.Router();

router.get('/reviews', function (req, res) {
  reservationsService.getAllReviews()
    .then((result) => {
      res.send(result);
    })
    .catch((errorResult) => {
      res.send(errorResult);
    });
});

router.get('/reviews/:id', function (req, res) {
  reservationsService.getAReviewsById(req.params.id)
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((errorResult) => {
      if (errorResult.reason === 'UNKNOWN') {
        res.status(500).send('Unknown error');
      } else if (errorResult.reason === 'NOT_FOUND') {
        res.status(404).send('Not found');
      }
    });
});

router.post('/reviews', function (req, res) {
  reviewsService.createReservation(req.body)
    .then((newReview) => {
      res.status(201).send(newReview);
    })
    .catch(() => {
      res.status(500).send('Unknown error');
    });
});

module.exports = router;