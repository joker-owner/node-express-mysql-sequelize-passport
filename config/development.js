const config = {
  app: {
    port: process.env.PORT || 3000,
    project: 'caas',
    url: 'http://localhost:3000/api',
    secret: "mJ70(Ao+nH1f=k%?^=<G5+m4|CyJ=o",
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
    apiKey: 'SG.06e7bfc1-d8d0-45c7-8051-fb2934ffbd99'
  }
}
module.exports = config;