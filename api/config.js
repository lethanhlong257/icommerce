const dialect = 'postgres'
const username = process.env.DB_USERNAME || 'icommerce'
const password = process.env.DB_PASSWORD || null
const host = process.env.DB_HOST || 'localhost'
const port = process.env.DB_PORT || 5432
const database = process.env.DB_NAME || 'icommerce'
const logging = process.env.DB_LOGGING == true

const poolMax = Number(process.env.DB_POOL_MAX) || 10
const poolMin = Number(process.env.DB_POOL_MIN) || 5
const poolIdle = Number(process.env.DB_POOL_IDLE_MS) || 10000
const poolAcquire = Number(process.env.DB_POOL_ACQUIRE_MS) || 60000
const poolEvict = Number(process.env.DB_POOL_EVICT_MS) || 10000
const statementTimeout = Number(process.env.DB_STATEMENT_TIMEOUT) || 0

module.exports = {
  namespacePrefix: 'icommerce',
  database,
  username,
  password,
  host,
  port,
  dialect,
  logging,
  pool: {
    max: poolMax,
    min: poolMin,
    idle: poolIdle,
    acquire: poolAcquire,
    evict: poolEvict
  },
  statementTimeout,
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize'
}