import Vehicle from '../models/Vehicle.js';
import vehicleValidator from '../validators/vehicleValidator.js';


const vehicleController = {
  // Criar um veículo
  create: async (req, res) => {
    try {
      await vehicleValidator.validate(req.body);
      const newVehicle = await Vehicle.create(req.body);  // Usando create no Sequelize
      res.status(201).json(newVehicle);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação', details: err.errors });
      }
      res.status(500).json({ message: 'Erro ao criar o veículo', error: err.message });
    }
  },

  // Listar todos os veículos
  list: async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll();  // Usando findAll para listar todos
      res.status(200).json(vehicles);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar os veículos', error: err.message });
    }
  },

  // Atualizar um veículo
  update: async (req, res) => {
    try {
      // Validar os dados com o Yup
      await vehicleValidator.validate(req.body);

      // Buscar o veículo pelo ID com Sequelize
      const vehicle = await Vehicle.findOne({ where: { id: req.params.id } });

      if (!vehicle) {
        return res.status(404).json({ message: 'Veículo não encontrado' });
      }

      // Atualizar o veículo
      await vehicle.update(req.body);

      res.status(200).json(vehicle);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro na validação', details: err.errors });
      }
      res.status(500).json({ message: 'Erro ao atualizar o veículo', error: err.message });
    }
  },

  // Excluir um veículo
  delete: async (req, res) => {
    try {
      const deletedVehicle = await Vehicle.findOne({ where: { id: req.params.id } });
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Veículo não encontrado' });
      }
      await deletedVehicle.destroy();  // Usando destroy para excluir
      res.status(200).json({ message: 'Veículo excluído com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir o veículo', error: err.message });
    }
  }
};

export default vehicleController;
