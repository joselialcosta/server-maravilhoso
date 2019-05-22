const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const maravilhosas = require('./maravilhosas')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Women API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /maravilhosas
    DELETE /maravilhosas/:id
    POST /maravilhosas { title, handle, avatarURL }
  </pre>
  `

  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.get('/maravilhosas', (req, res) => {
  res.send(maravilhosas.get(req.token))
})

app.delete('/maravilhosas/:id', (req, res) => {
  res.send(maravilhosas.remove(req.token, req.params.id))
})

app.post('/maravilhosas', bodyParser.json(), (req, res) => {
  const { name, handle } = req.body

  if (name && handle) {
    res.send(maravilhosas.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Please provide both a name and a handle'
    })
  }
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
