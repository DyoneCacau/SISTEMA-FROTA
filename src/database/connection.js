// src/database/connection.js
import sequelize from '../config/database.js'; // Importa a configuração do Sequelize

// Sincroniza o banco de dados
const connectToDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado!');
  } catch (err) {
    console.error('Erro ao conectar e sincronizar o banco de dados:', err);
  }
};

export default connectToDatabase;
