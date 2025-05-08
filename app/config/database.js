const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourStrong@Passw0rd',
  database: process.env.DB_NAME || 'express_example',
  port: process.env.DB_PORT || 1433,
  dialectOptions: {
    options: {
      encrypt: true, 
      trustServerCertificate: true 
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MSSQL has been established successfully.');
    
    // Sync all models
    // Note: In production, you might want to use migrations instead
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };