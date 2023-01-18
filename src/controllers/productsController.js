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

  const { type, message, data } = await productsService.registerProduct(newProductName);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message, data } = await productsService.updateProduct(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(data);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.removeProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  removeProduct,
};