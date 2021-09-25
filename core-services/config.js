const dialect = 'postgres'

const username = process.env.KOBITON_DB_USERNAME || null
const password = process.env.KOBITON_DB_PASSWORD || null
const host = process.env.KOBITON_DB_HOST || 'localhost'
const port = process.env.KOBITON_DB_PORT || 5432
const database = process.env.KOBITON_DB_NAME || 'kobiton'

/**
 * These params are optional
 */
const logging = process.env.KOBITON_DB_LOGGING == true
// Since the size of Postgresql on test env is t2,
// We need to set the db pool limit to a small number
// https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Managing.Performance.html
const poolMax = Number(process.env.KOBITON_DB_POOL_MAX) || 10
const poolMin = Number(process.env.KOBITON_DB_POOL_MIN) || 5
const poolIdle = Number(process.env.KOBITON_DB_POOL_IDLE_MS) || 10000
const poolAcquire = Number(process.env.KOBITON_DB_POOL_ACQUIRE_MS) || 60000
const poolEvict = Number(process.env.KOBITON_DB_POOL_EVICT_MS) || 10000
const statementTimeout = Number(process.env.KOBITON_DB_STATEMENT_TIMEOUT) || 0

const config = {
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

export default {
  // Used by app for convenience since we don't differentiate among node envs.
  ...config,

  // Used for migration/seeding by sequelize-cli, which requires specific config
  // for each node environment.
  development: config,
  testing: config,
  production: config
}
