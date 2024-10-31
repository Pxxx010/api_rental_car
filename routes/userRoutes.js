const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Pega o token do cabeçalho
  if (!token) return res.status(403).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });

    // Armazena os dados do usuário decodificado na requisição
    req.user = {
      id: decoded.id,
      cargo: decoded.cargo,
      email: decoded.email // Inclua o email aqui
    };

    next();
  });
};

// Cadastro de novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password, cargo } = req.body;

  // Verificar se o email já está em uso
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email já está em uso.' });
  }

  // Criptografar a senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, cargo });
  await user.save();

  console.log(`Usuário cadastrado: ${name}, Email: ${email}`); // Log do cadastro
  res.status(201).json({ ...user.toJSON(), password: undefined }); // Retorna o usuário sem a senha
});

// Login do usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Verifica se o usuário existe e se a senha está correta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Inclua o email no token
    const token = jwt.sign({ id: user._id, cargo: user.cargo, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`Usuário logado: ${user.name}, Email: ${email}`); // Log do login
    res.json({ token, user: { ...user.toJSON(), password: undefined } }); // Retornando o usuário sem a senha
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

// Listar todos os usuários (restrito a administradores)
router.get('/', authenticate, async (req, res) => {
  // Verificar se o usuário é um administrador
  if (req.user.cargo !== 'adm') {
    return res.status(403).json({ message: 'Acesso negado. Somente administradores podem acessar esta rota.' });
  }

  try {
    const users = await User.find();
    
    console.log(`Usuário: (${req.user.id}) | Cargo: ${req.user.cargo} |> acessou a lista de usuários.`); // Log do acesso à lista de usuários
    res.json(users.map(user => ({ ...user.toJSON(), password: undefined, _id: undefined, __v: undefined }))); // Retorna usuários sem senhas
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
});

module.exports = router;
