import Vehicle from '../models/vehicle.js';

const vehicleController = {
  // Criar um veículo
  create: async (req, res) => {
    try {
      const { modelo, placa, ano, cor } = req.body;
      const newVehicle = await Vehicle.create({ modelo, placa, ano, cor });
      res.status(201).json(newVehicle);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao cadastrar o veículo' });
    }
  },

  // Listar todos os veículos
  list: async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll();
      res.status(200).json(vehicles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao listar os veículos' });
    }
  },

  // Atualizar um veículo
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { modelo, placa, ano, cor } = req.body;
      const vehicle = await Vehicle.findByPk(id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Veículo não encontrado' });
      }
      vehicle.modelo = modelo;
      vehicle.placa = placa;
      vehicle.ano = ano;
      vehicle.cor = cor;
      await vehicle.save();
      res.status(200).json(vehicle);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar o veículo' });
    }
  },

  // Excluir um veículo
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByPk(id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Veículo não encontrado' });
      }
      await vehicle.destroy();
      res.status(200).json({ message: 'Veículo excluído com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir o veículo' });
    }
  },
};

export default vehicleController;
