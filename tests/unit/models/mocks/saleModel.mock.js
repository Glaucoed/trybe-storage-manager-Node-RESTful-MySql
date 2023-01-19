const numberOne = 1;

const resultQuery = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}

const saleUpdateSucess = { productId: 1, quantity: 1 }

const idAvailable = { id: 2, date: "2023-01-18T18:50:19.000Z" }

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

const removeSucess = { type: null }

module.exports = {
  saleUpdateSucess,
  removeSucess,
  idAvailable,
  numberOne,
  resultQuery,
  allSales,
  allSalesGetById,
}