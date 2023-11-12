import express from 'express'
import apiRouter from './routes/api/index.js'

import cors from 'cors'

import { options } from './static-options.js'
import database from './database.js'
import { runMigrations } from './migration.js'
import config from './config.js'

const app = express()

app.use(cors())

// подключение статической папки с админкой
app.use('/admin', express.static('admin', options))

// подключение станической папки с картинками
app.use('/img', express.static('img'))

// подключение Bootstrap
app.use('/', express.static('./node_modules/bootstrap/dist/'))
app.use('/icons', express.static('./node_modules/bootstrap-icons/'))

// подключение контроллера БД
app.use('/api/', apiRouter)

/* В остальных случаях отправим HTML-страницу */
app.get('/admin', (req, res) => {
  res.sendFile('/admin/index.html', { root: '.' })
})

await connectDatabase()

app.listen(`${config.port}`, () => {
  console.log(`Server started on ${config.hostname}:${config.port} ...`)
})

async function connectDatabase () {
  try {
    await database.createDatabase()
    await database.openConnection()
    console.log('Database connection has been established successfully.')
    await runMigrations()
    // await closeConnection();
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}
