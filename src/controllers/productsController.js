const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const data = await productsService.getAll();

  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message, data } = await productsService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(data);
};

const registerProduct = async (req, res) => {
  const { name: newProductName } = req.body;
  const newProduct = await productsService.registerProduct(newProductName);
  
  return res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  getById,
  registerProduct,
};