const dbSettings = {
  db: process.env.DB || 'measurements',
  user: process.env.DB_USER || 'morozov',
  pass: process.env.DB_PASS || 'morozov_pass_1',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'localhost:27017'
  ],
  dbParameters: () => ({
    w: 'majority',
    wtimeout: 10000,
    j: true,
    readPreference: 'ReadPreference.SECONDARY_PREFERRED',
    native_parser: false
  }),
  serverParameters: () => ({
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    }
  })
}

const servicesSettings = {
  authService: {
    hostname: 'auth-server',
    port: 3000
  }
}

// server parameters
const serverSettings = {
  port: process.env.PORT || 3000,
  authService: {
    hostname: process.env.AUTH_HOST || 'auth-server',
    port: process.env.AUTH_PORT || 3001
  }
}

module.exports = Object.assign({}, {
  dbSettings,
  serverSettings
})
