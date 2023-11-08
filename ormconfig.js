module.exports = {
  "name": "default",
  "type": "mysql",
  "host": `${process.env.TYPEORM_HOST}`,
  "port": Number(process.env.TYPEORM_PORT),
  "username": `${process.env.TYPEORM_USERNAME}`,
  "password": `${process.env.TYPEORM_PASSWORD}`,
  "database": `${process.env.TYPEORM_DATABASE}`,
  "entities": [
    "./**/models/*{.ts,.js}"
  ],
  "migrations": [
    "./**/database/migrations/*{.ts,.js}"
  ],
  "cli": {
    "migrationsDir": "./**/database/migrations"
  }
};