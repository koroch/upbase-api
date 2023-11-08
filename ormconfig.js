module.exports = {
  "name": "default",
  "type": "mysql",
  "host": `${process.env.TYPEORM_HOST}`,
  "port": process.env.TYPEORM_PORT,
  "username": `${process.env.TYPEORM_USERNAME}`,
  "password": `${process.env.TYPEORM_PASSWORD}`,
  "database": `${process.env.TYPEORM_DATABASE}`,
  "entities": [
    "./dist/models/*{.ts,.js}"
  ],
  "migrations": [
    "./dist/database/migrations/*{.ts,.js}"
  ],
  "cli": {
    "migrationsDir": "./dist/database/migrations"
  }
};