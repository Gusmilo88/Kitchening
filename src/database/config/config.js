require("dotenv").config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, // Password al momento de instalarlo
    database: process.env.DB_DATABASE, // Nombre de la base de datos con la que nos vamos a conectar
    host: process.env.DB_HOST,
    dialect: "mysql", // Lenguaje
    port: process.env.DB_PORT, //Puerto
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
