module.export = {
  development: {
    username: "root", 
    password: "root", // Password al momento de instalarlo
    database: "kitchening_db", // Nombre de la base de datos con la que nos vamos a conectar
    host: "127.0.0.1",
    dialect: "mysql", // Lenguaje
    port: 3306, //Puerto
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
