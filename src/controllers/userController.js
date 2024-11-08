// src/controllers/userController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'; // Carregar variáveis de ambiente
import userModel from '../models/user.js';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Função de registro de usuário
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios!' });
  }

  try {
    // Verificar se o usuário já existe
    const existingUser = await userModel.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: { username: newUser.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar o usuário' });
  }
};

// Função de login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios!' });
  }

  try {
    // Procurar usuário no banco de dados
    const user = await userModel.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Comparar senha com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retornar o token
    res.json({ token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
};

// Exportar as funções
export default {
  registerUser,
  loginUser
};
