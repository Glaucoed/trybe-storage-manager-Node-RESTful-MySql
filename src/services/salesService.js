const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const data = await salesModel.getAll();
  return data;
};

const getById = async (id) => {
  const data = await salesModel.getById(id);

  if (!data || data.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, data };
};

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
      salesModel.registerSale(idSale, productId, quantity);
  });
  
  await Promise.all(promises);
  
  return { data: { id: idSale, itemsSold: listaProdutos } };
};

module.exports = {
  registerSale,
  getAll,
  getById,
};