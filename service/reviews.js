// Code in here contains any logic for operations on dogs; i.e getting dogs, get a dog, create a dog
const reviewsRepository = require('../repository/reviews');

const getAllReviews = () => {
  return reviewsRepository.getAllReviews()
    .then((reviews) => {
      return reviews;
    })
    .catch((error) => {
      return `There was an issue ${error}`;
    });
}

const getReviewById = (id) => {
  return reviewsRepository.getReviewById(id);
};

const createReview = (review) => {
  return reviewsRepository.createAReview(review);
};

const service = {
  getAllReviews,
  getReviewById,
  createReview,
};

module.exports = service;
