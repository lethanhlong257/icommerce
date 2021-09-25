export const dialect = 'postgres'
export const username = process.env.DB_USERNAME || 'icommerce'
export const password = process.env.DB_PASSWORD || null
export const host = process.env.DB_HOST || 'localhost'
export const port = process.env.DB_PORT || 5432
export const database = process.env.DB_NAME || 'icommerce'
export const logging = process.env.DB_LOGGING == true

export const poolMax = Number(process.env.DB_POOL_MAX) || 10
export const poolMin = Number(process.env.DB_POOL_MIN) || 5
export const poolIdle = Number(process.env.DB_POOL_IDLE_MS) || 10000
export const poolAcquire = Number(process.env.DB_POOL_ACQUIRE_MS) || 60000
export const poolEvict = Number(process.env.DB_POOL_EVICT_MS) || 10000
export const statementTimeout = Number(process.env.DB_STATEMENT_TIMEOUT) || 0

export const API_PORT = process.env.PORT || '3000'

export const pool = {
  max: poolMax,
  min: poolMin,
  idle: poolIdle,
  acquire: poolAcquire,
  evict: poolEvict
}

export const migrationStorage = 'sequelize'
export const seederStorage = 'sequelize'

export const namespacePrefix = 'icommerce'
