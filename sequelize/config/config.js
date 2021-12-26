module.exports = {
    "development": {
      "url": process.env.DATABASE_URL,
      "dialect": "postgres"
    },
    "test": {
      "url": "",
      "dialect": "postgres"
    },
    "production": {
      "url": "",
      "dialect": "postgres"
    }
  }