const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Listar todos os carros
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Adicionar um novo carro
router.post('/', async (req, res) => {
  const { name, model, weeklyRate } = req.body;
  const car = new Car({ name, model, weeklyRate });
  await car.save();
  res.status(201).json(car);
});

// Buscar um carro por ID
router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
  res.json(car);
});

// Atualizar informações de um carro
router.put('/:id', async (req, res) => {
  const { name, model, weeklyRate } = req.body;
  const car = await Car.findByIdAndUpdate(req.params.id, { name, model, weeklyRate }, { new: true });
  if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
  res.json(car);
});

// Deletar um carro
router.delete('/:id', async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  if (!car) return res.status(404).json({ message: 'Carro não encontrado' });
  res.json({ message: 'Carro deletado com sucesso' });
});


module.exports = router;
