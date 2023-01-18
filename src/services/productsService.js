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

const updateProduct = async (id, name) => {
  const allProductsId = await productsModel.getAll();
  const lastIdProduct = allProductsId.at(-1).id;

  if (id > lastIdProduct) return { type: 'ID_SALE_NOT_FOUND', message: 'Product not found' }; 

  const error = schema.validateName(name);
  if (error.type) return error;

  const data = await productsModel.updateProduct(id, name);

  return { type: null, data };
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
};