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



module.exports = {
  productSalesBody,
  newProductSale,
  messageError,
  productSalesBodyInvalid,
};