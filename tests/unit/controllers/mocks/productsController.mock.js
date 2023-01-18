const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

const mockErrorNotFoundId = { "type": 'ID_SALE_NOT_FOUND', "message": 'Product not found' }

const product = { id: 1, name: 'Martelo de Thor' };

const productBody = { name: 'Teia do Homem Aranha' };

const newProduct = { id: 03, ...productBody };

module.exports = {
  mockErrorNotFoundId,
  allProducts,
  product,
  productBody,
  newProduct,
};