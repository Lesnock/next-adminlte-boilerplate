const express = require('express')
const next = require('next')
const { Public, Private } = require('./src/routes')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const PORT = 3000

nextApp.prepare().then(() => {
  const server = express()

  server.use(express.urlencoded({ extended: true }))
  server.use(express.json())

  server.use(Public)
  server.use(Private)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) {
      throw err
    }

    console.log('Running server on port ' + PORT)
  })
})
