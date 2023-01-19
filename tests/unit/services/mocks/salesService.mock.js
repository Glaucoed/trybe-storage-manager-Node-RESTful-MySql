const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
]
const param1 = 3;
const param2 = 1;
const param3 = 1

const removeSale = { type: null }

const updateObj = 	{
			productId: 1,
			quantity: 1
		}
const updateSale = {
	saleId: 3,
	itemsUpdated: [
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

const arrayMockInvalidProduct = [
	{
		productId: 999999999,
		quantity: 20,
	},
  {
    productId: 99999999999,
		quantity: 20,
	}
]

const allSalesId = [
  {
    "id": 1,
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "id": 1,
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "id": 2,
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const allSales = [
  {
    "saleId": 1,
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const allSalesGetById = [
  {
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-01-17T23:38:41.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
  arrayMockInvalidProduct,
  updateObj,
  updateSale,
  allSalesId,
  removeSale,
  allSalesGetById,
  allSales,
  arrayMockInvalidZero,
  arrayMockInvalid,
  arrayMock,
  newProductSale,
  allProducts,
  param3,
  param2,
  param1,
}

