const repository = require('./maravilhosasRepository')

const getAll = () => {

  return repository.maravilhosas
}

const add = (maravilhosa) => {
  if (!maravilhosa.id) {
    maravilhosa.id = Math.random().toString(36).substr(-8)
  }

  getAll().content.push(maravilhosa)

  return maravilhosa
}

const remove = (id) => {
  
  let listagemMaravilhosa = getAll()

  getAll().content = listagemMaravilhosa.content.filter((mulher) => {
    return mulher.id !== id })
}

module.exports = {
  getAll,
  add,
  remove
}
