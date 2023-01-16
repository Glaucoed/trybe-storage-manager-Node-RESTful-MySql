const productsModel = require('../models/productsModel');
const schema = require('./validations/validateInputProducts');

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
  const error = schema.validateName(newProductName);
  if (error.type) return error;

  const newId = await productsModel.registerProduct(newProductName);
  const newProduct = await productsModel.getById(newId);

  return { type: null, data: newProduct };
};

module.exports = {
  getAll,
  getById,
  registerProduct,
};