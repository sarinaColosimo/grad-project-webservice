// Code in here should be code that gets/saves/creates reservations in the database
const db = require('./db');


//INSERT INTO `grad_project`.`reservation` (`id`, `date`, `status`, `dog_id`, `user_id`, `review_id`) VALUES ('1', '9/1/2020', 'Approved', '1', '2', '3');

const createAReservation = (reservation) => {
  const { date, status, dog_id, user_id } = reservation;
  var sql = `INSERT INTO reservation (date, status, dog_id, user_id) VALUES ('${date}', '${status}', '${dog_id}', '${user_id}')`
  return new Promise((resolve, reject) => {
    db.query(sql, function(err, result) {
      if (err) {
        reject({ reason: 'UNKNOWN'});
      } else {
        console.log(result)
        const newReservation = { ...reservation, id: result.insertId };
        resolve(newReservation);
      }
    }); 
  });
};

const getAllReservations = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM reservation', function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const getReservationById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM reservation WHERE id = ${id}`, function (error, results) {
      if (error) {
        reject({ reason: 'UNKNOWN' });
      } else {
        if (results.length === 1) {
          resolve(JSON.parse(JSON.stringify(results[0])));
        } else {
          // Didn't find the reservation by id
          reject({ reason: 'NOT_FOUND' });
        }
      }
    });
  });
};



module.exports = {
  createAReservation,
  getAllReservations,
  getReservationById
};
