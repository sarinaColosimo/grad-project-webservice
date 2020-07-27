// Code in here should be code that gets/saves/creates reviews in the database
const db = require('./db');


//INSERT INTO `grad_project`.`review` (`id`, `date`, `status`, `dog_id`, `user_id`, `review_id`) VALUES ('1', '9/1/2020', 'Approved', '1', '2', '3');

const createAReview = (review) => {
  const { date, status, dog_id, user_id, review_id } = review;
  var sql = `INSERT INTO review(date, status, dog_id, user_id, review_id) VALUES ('${date}', '${status}', '${dog_id}', '${user_id}', '${review_id}')`
  return new Promise((resolve, reject) => {
    db.query(sql, function(err, result) {
      if (err) {
        reject({ reason: 'UNKNOWN'});
      } else {
        console.log(result)
        const newReview = { ...review, id: result.insertId };
        resolve(newReview);
      }
    }); 
  });
};

const getAllReviews = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM review', function (error, results) {
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
