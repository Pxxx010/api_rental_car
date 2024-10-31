const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Criar uma nova reserva
router.post('/', async (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;
  const reservation = new Reservation({ userId, carId, startDate, endDate });
  await reservation.save();
  res.status(201).json(reservation);
});

// Listar todas as reservas
router.get('/', async (req, res) => {
  const reservations = await Reservation.find().populate('userId carId');
  res.json(reservations);
});

// Buscar uma reserva por ID
router.get('/:id', async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate('userId carId');
  if (!reservation) return res.status(404).json({ message: 'Reserva não encontrada' });
  res.json(reservation);
});

// Deletar uma reserva
router.delete('/:id', async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) return res.status(404).json({ message: 'Reserva não encontrada' });
  res.json({ message: 'Reserva deletada com sucesso' });
});

module.exports = router;