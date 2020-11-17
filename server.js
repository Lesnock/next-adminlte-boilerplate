const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const PORT = 3000

nextApp.prepare().then(() => {
  const server = express()

  server.get('/api/hello', (req, res) => {
    return res.send('Deu certo')
  })

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
