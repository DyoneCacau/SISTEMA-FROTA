import express from 'express';
// No arquivo src/routes/vehicleRoutes.js
import authMiddleware from '../middleware/authMiddleware.js';

import vehicleController from '../controllers/vehicleController.js';

const router = express.Router();

// Cadastrar um veículo
router.post('/', vehicleController.create);

// Listar todos os veículos
router.get('/', authMiddleware, vehicleController.list);

// Atualizar um veículo
router.put('/:id', authMiddleware, vehicleController.update);

// Excluir um veículo
router.delete('/:id', vehicleController.delete);

export default router;
