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

const getAReviewById = (id) => {
  return reviewsRepository.getAReviewById(id);
};

const createReview = (review) => {
  return reviewsRepository.createAReview(review);
};

const service = {
  getAllReviews,
  getAReviewById,
  createReview,
};

module.exports = service;
