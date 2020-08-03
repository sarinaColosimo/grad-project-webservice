// Code in here does only HTTP logic for reviews; i.e defining endpoints and getting data out of the HTTP request

const express = require('express');
const reviewsService = require('../service/reviews')
const router = express.Router();

router.get('/users/:userId/reviews', function (req, res) {
  reviewsService.getAllReviews(req.params.userId)
    .then((result) => {
      res.send(result);
    })
    .catch((errorResult) => {
      res.send(errorResult);
    });
});

router.get('users/:userId/reviews/:id', function (req, res) {
  reviewsService.getReviewById(req.params.id)
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

router.post('/reservations/:reservationId/reviews', function (req, res) {
  const review = { ...req.body, reservation_id: req.params.reservationId };
  reviewsService.createReview(review)
    .then((newReview) => {
      res.status(201).send(newReview);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Unknown error');
    });
});

module.exports = router;