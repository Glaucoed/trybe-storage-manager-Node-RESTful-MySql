const productSalesBody = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];


const productSalesBodyInvalid = [
  {
    "productId": 999,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];

const messageError = { message: 'Product not found' }

const newProductSale = { id: 3, itemsSold: productSalesBody };

const mockErrorSaleNotFound = { type: 'ID_SALE_NOT_FOUND', message: 'Product not found' }

const mockErrorNotFoundId = { "type": 'ID_SALE_NOT_FOUND', "message": 'Product not found' }


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
  mockErrorSaleNotFound,
  mockErrorNotFoundId,
  allSales,
  allSalesGetById,
  productSalesBody,
  newProductSale,
  messageError,
  productSalesBodyInvalid,
};