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

const removeSale = async (id) => {
  const allSalesId = await salesModel.getAll();
  const lastIdSales = allSalesId.at(-1).id;
  const verifyAvailableId = id > lastIdSales;

  const verifyContainsIdDatabase = await salesModel.queryIdAvailable(id);

  const verifyIdRemove = verifyContainsIdDatabase === undefined;

  const { type, message } = await salesModel.removeSale(id);
  
  if (type || verifyAvailableId || verifyIdRemove) {
    return { type: 'ID_SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type, message };
};

const updateSale = async (arrayBody, id) => {
  const verifyQuantity = arrayBody.some((item) => item.quantity <= 0);
  if (verifyQuantity) {
    return { type: 'UNPROCESSABLE_ENTITY', message: '"quantity" must be greater than or equal to 1',
    }; 
  } 
  const verifyIdContains = await salesModel.getById(id);
  if (verifyIdContains.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; 
  }
  const containsProduct = await Promise.all(arrayBody
    .map(({ productId }) => productsModel.getById(productId)));
  
  const verifyProducts = containsProduct.some((products) => products === undefined);
    if (verifyProducts) return { type: 'SALE_NOT_FOUND', message: 'Product not found' };
  
  const newData = await Promise.all(arrayBody
    .map(async ({ quantity, productId }) => salesModel.updateSale(quantity, id, productId)));

  return { data: { saleId: +id, itemsUpdated: newData } };
};

module.exports = {
  updateSale,
  registerSale,
  getAll,
  getById,
  removeSale,
};