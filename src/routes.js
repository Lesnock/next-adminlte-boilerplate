const { Router } = require('express')

const Public = new Router()
Public.get('/test', (req, res) => {
  return res.json('Testou')
})

const Private = new Router()

module.exports = {
  Public,
  Private
}
