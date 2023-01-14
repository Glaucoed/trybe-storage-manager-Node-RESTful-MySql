const productsModel = require('../models/productsModel');

const getAll = async () => { 
  const data = await productsModel.getAll();
  return data;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return { type: 404, message: 'Product not found' };

  return { type: null, data: product };
};

module.exports = {
  getAll,
  getById,
};