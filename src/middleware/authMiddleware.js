// No arquivo src/routes/authMiddleware.js
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado, token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
