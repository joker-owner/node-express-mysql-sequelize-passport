const config = {
  app: {
    port: process.env.PORT || 3000,
    project: 'caas',
    url: 'http://localhost:3000/api',
    secret: 'lP=.|gJrH/E[#h9T86Aq+1jw%shIeU',
  },
  db: {
    host: 'localhost',
    database: 'caas',
    username: 'root',
    password: '',
    dialect: 'mysql',
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  },
  sendgrid: {
    apiKey: ''
  }
}
module.exports = config;