// Code in here contains any logic for operations on dogs; i.e getting dogs, get a dog, create a dog
const dogsRepository = require('../repository/dogs');

const getAllDogs = () => {
  return dogsRepository.getAllDogs()
    .then((dogs) => {
      return dogs;
    })
    .catch((error) => {
      return `There was an issue ${error}`;
    });
}

const getADogById = (id) => {
  return dogsRepository.getDogById(id);
};

const createDog = (dog) => {
  return dogsRepository.createADog(dog);
};

const service = {
  getAllDogs,
  getADogById,
  createDog,
};

module.exports = service;
