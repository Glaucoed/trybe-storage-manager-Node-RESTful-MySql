const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const registerSale = async (listaProdutos) => {
  const allProductsId = await productsModel.getAll();
  const lastIdProduct = allProductsId.at(-1).id;
  
  const verificaProductId = listaProdutos.every((item) => item.productId <= lastIdProduct);
  if (!verificaProductId) return { type: 'ID_SALE_NOT_FOUND', message: 'Product not found' }; 
  
  const verifyQuantity = listaProdutos.every((item) => item.quantity <= 0);
  if (verifyQuantity) {
    return {
      type: 'UNPROCESSABLE_ENTITY', message: '"quantity" must be greater than or equal to 1',
    }; 
  } 
  
  const idSale = await salesModel.newIdSale();
  const promises = listaProdutos.map(async ({ productId, quantity }) => {
      salesModel.saleProducts(idSale, productId, quantity);
  });
  
  await Promise.all(promises);

  return { data: { id: idSale, itemsSold: listaProdutos } };
};

module.exports = {
  registerSale,
};