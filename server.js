const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware de log
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
  next(); // Chama o próximo middleware ou rota
});

// Importar rotas
const carRoutes = require('./routes/carRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');

// Rotas
app.use('/api/cars', carRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(5000, () => console.log('Servidor rodando na porta 5000')))
  .catch(error => console.error(error));
