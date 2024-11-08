// src/routes/userRoutes.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import userController from '../controllers/userController.js';  // Alteração aqui

const router = express.Router();

// Validação de dados para o registro
const validateRegister = [
  body('username').isLength({ min: 3 }).withMessage('Nome de usuário deve ter pelo menos 3 caracteres'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  // Outros validadores que você achar necessário
];

// Função de validação e processamento do erro
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/register', validateRegister, handleValidationErrors, userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
