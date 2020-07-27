// Code in here should be code that gets/saves/creates dogs in the database
const db = require('./db');


const createADog = (dog) => {
  const { name, breed, gender, age, weight } = dog;
  var sql = `INSERT INTO dog(name, breed, gender, age, weight) VALUES ('${name}', '${breed}', '${gender}', '${age}', '${weight}')`
  return new Promise((resolve, reject) => {
    db.query(sql, function(err, result) {
      if (err) {
        reject({ reason: 'UNKNOWN'});
      } else {
        console.log(result)
        const newDog = { ...dog, id: result.insertId };
        resolve(newDog);
      }
    }); 
  });
};

const getAllDogs = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM dog', function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const getDogById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM dog WHERE id = ${id}`, function (error, results) {
      if (error) {
        reject({ reason: 'UNKNOWN' });
      } else {
        if (results.length === 1) {
          resolve(JSON.parse(JSON.stringify(results[0])));
        } else {
          // Didn't find the dog by id
          reject({ reason: 'NOT_FOUND' });
        }
      }
    });
  });
};

// const saveDog = (dog) => {

// };

module.exports = {
  getAllDogs,
  getDogById,
  createADog
};
