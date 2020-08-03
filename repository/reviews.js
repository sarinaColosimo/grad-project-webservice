// Code in here should be code that gets/saves/creates reviews in the database
const db = require('./db');


//INSERT INTO `grad_project`.`review` (`reservation_id`, `text`) VALUES ('1', 'Great Dog!');

const createAReview = (review) => {
  const { reservation_id, dog_id, review_text } = review;
  var sql = `INSERT INTO review (reservation_id, dog_id, review_text) VALUES ('${reservation_id}', '${dog_id}', '${review_text}')`
  return new Promise((resolve, reject) => {
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        reject({ reason: 'UNKNOWN'});
      } else {
        console.log(result)
        const newReview = { ...review, id: result.insertId };
        resolve(newReview);
      }
    }); 
  });
};

const getAllReviews = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM reservation JOIN review ON reservation.id = review.reservation_id WHERE reservation.user_id='${userId}'`, function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const getReviewById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM review WHERE id = ${id}`, function (error, results) {
      if (error) {
        reject({ reason: 'UNKNOWN' });
      } else {
        if (results.length === 1) {
          resolve(JSON.parse(JSON.stringify(results[0])));
        } else {
          // Didn't find the review by id
          reject({ reason: 'NOT_FOUND' });
        }
      }
    });
  });
};



module.exports = {
  createAReview,
  getAllReviews,
  getReviewById
};
