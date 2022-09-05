module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT
  }
}
