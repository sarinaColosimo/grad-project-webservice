// Code in here contains any logic for operations on reservations; i.e get a reservation, create a reservation
const reservationsRepository = require('../repository/reservations');

const getAllReservations = (userId) => {
  return reservationsRepository.getAllReservations(userId)
    .then((reservations) => {
      return reservations;
    })
    .catch((error) => {
      return `There was an issue ${error}`;
    });
}

const getAReservationById = (id) => {
  return reservationsRepository.getReservationById(id);
};

const createReservation = (reservation) => {
  return reservationsRepository.createAReservation(reservation);
};

const service = {
  getAllReservations,
  getAReservationById,
  createReservation,
};

module.exports = service;
