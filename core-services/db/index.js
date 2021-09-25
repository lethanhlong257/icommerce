import {
  database, dialect, logging,
  username, password, pool,
  host, port, statementTimeout
} from './config'

import * as kfs from '../services/kfs'

const db = new Sequelize(database, username, password, {
  host, port, dialect, logging, pool,
  dialectOptions: {
    // In order to prevent api from hanging, we have to set
    // the threshold for query time to postgres (in ms)
    // This value is disabled by default (statement_timeout = 0)
    statement_timeout: statementTimeout
  },
  define: {} // global options
})

const modelDir = path.join(__dirname, '.')
const models = kfs.requireDir(modelDir, ['index.js', 'config.js'], db)

for (const model of models) {
  db[model.name] = model
}

export default db