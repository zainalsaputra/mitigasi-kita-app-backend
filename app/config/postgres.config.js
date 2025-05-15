const { Sequelize } = require('sequelize');

const config = require('../../config/config')[process.env.NODE_ENV || 'production'];
module.exports = config;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectModule: config.dialectModule,
    dialectOptions: config.dialectOptions,
    logging: config.logging,
  }
);

const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const closePostgresConnection = async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
};

module.exports = {connectToPostgres, closePostgresConnection}