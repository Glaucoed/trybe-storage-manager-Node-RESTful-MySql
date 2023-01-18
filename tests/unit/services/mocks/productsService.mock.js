const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
]

const resultUpdateInvalid = {type: 'ID_SALE_NOT_FOUND', message: 'Product not found'}

const product = { id: 1, name: 'Martelo de Thor' }

const newProduct = { id: 3, name: 'Teia do Homem Aranha' }

const removeProduct = { type: null }

const invalidName = 'abc'

const validName = 'Teia do Homem Aranha'

const validId = 1;

const invalidId = 999;

module.exports = {
  resultUpdateInvalid,
  invalidId,
  allProducts,
  product,
  newProduct,
  invalidName,
  validName,
  validId,
  removeProduct,
}