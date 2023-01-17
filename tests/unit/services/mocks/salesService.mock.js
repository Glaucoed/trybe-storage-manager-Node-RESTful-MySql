const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
]
const param1 = 3;
const param2 = 1;
const param3 = 1

const newProductSale = {
	id: 3,
	itemsSold: [
		{
			productId: 1,
			quantity: 1
		},
		{
			productId: 1,
			quantity: 1
		}
	]
}

const arrayMock = [
	{
		productId: 1,
		quantity: 1
	},
	{
		productId: 1,
		quantity: 1
	}
]

const arrayMockInvalid = [
	{
		productId: 999,
		quantity: 1
	},
	{
		productId: 999,
		quantity: 1
	}
]

const arrayMockInvalidZero = [
	{
		productId: 1,
		quantity: 0,
	},
	{
		productId: 1,
		quantity: 0,
	}
]

module.exports = {
  arrayMockInvalidZero,
  arrayMockInvalid,
  arrayMock,
  newProductSale,
  allProducts,
  param3,
  param2,
  param1,
}

