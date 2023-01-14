const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const data = await productsService.getAll();

  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message, data } = await productsService.getById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(data);
};

module.exports = {
  getAll,
  getById,
};