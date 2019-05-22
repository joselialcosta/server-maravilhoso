const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  content: [
    {
      id: 'richard',
      name: 'Richard Kalehoff',
      handle: '@richardkalehoff',
      avatarURL: config.origin + '/richard.jpg'
    },
    {
      id: 'karen',
      name: 'Karen Isgrigg',
      handle: '@karen_isgrigg',
      avatarURL: config.origin + '/karen.jpg'
    },
    {
      id: 'tyler',
      name: 'Tyler McGinnis',
      handle: '@tylermcginnis',
      avatarURL: config.origin + '/tyler.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, maravilhosa) => {
  if (!maravilhosa.id) {
    maravilhosa.id = Math.random().toString(36).substr(-8)
  }

  get(token).content.push(maravilhosa)

  return maravilhosa
}

const remove = (token, id) => {
  const data = get(token)
  const maravilhosa = data.content.find(c => c.id === id)

  if (maravilhosa) {
    data.content = data.content.filter(c => c !== maravilhosa)
  }

  return { content: maravilhosa }
}

module.exports = {
  get,
  add,
  remove
}
