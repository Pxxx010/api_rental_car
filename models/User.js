const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cargo: { // Novo atributo adicionado
    type: String,
    enum: ['cliente', 'adm'], // Valores permitidos
    required: true, // Campo obrigatório
    default: 'cliente'
  },
});

// Middleware para criptografar a senha antes de salvar o usuário
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar a senha fornecida com a senha armazenada
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
