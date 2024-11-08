// src/models/vehicle.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vehicle = sequelize.define('Vehicle', {
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: true,  // Se for opcional
  },
  proprietario: {   // Adicionando a nova coluna
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default Vehicle;
