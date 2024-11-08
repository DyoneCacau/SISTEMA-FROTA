import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';  // Importa as rotas de usuário
import vehicleRoutes from './routes/vehicleRoutes.js';  // Caso tenha rotas de veículos
import sequelize from './config/database.js';  // Importe a instância do sequelize

dotenv.config();

const app = express();
app.use(express.json()); // Middleware para parsear o corpo das requisições como JSON

// Usando as rotas de usuários e veículos
app.use('/auth', userRoutes);
app.use('/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
    sequelize.sync() // Sincroniza as tabelas com o banco de dados
      .then(() => {
        console.log('Banco de dados sincronizado!');
      })
      .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
