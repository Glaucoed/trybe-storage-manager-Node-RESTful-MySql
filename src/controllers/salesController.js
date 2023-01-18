const salesService = require('../services/salesService');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const data = await salesService.getAll();

  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message, data } = await salesService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  return res.status(200).json(data);
};

const registerSale = async (req, res) => {
  const array = req.body;

  const { type, message, data } = await salesService.registerSale(array);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(data);
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.removeSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(204).end();
};

module.exports = {
  registerSale,
  getAll,
  getById,
  removeSale,
};