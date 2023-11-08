module.exports = {
  "name": "default",
  "type": "mysql",
  "host": "",
  "port": 21197,
  "username": "",
  "password": "",
  "database": "",
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