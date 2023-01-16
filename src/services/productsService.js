const productsModel = require('../models/productsModel');

const getAll = async () => { 
  const data = await productsModel.getAll();
  return data;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, data: product };
};

const registerProduct = async (newProductName) => {
  const newId = await productsModel.registerProduct(newProductName);

  const newProduct = await productsModel.getById(newId);

  return newProduct;
};

module.exports = {
  getAll,
  getById,
  registerProduct,
};