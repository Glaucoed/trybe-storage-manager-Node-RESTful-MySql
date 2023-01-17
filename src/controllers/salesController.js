const salesService = require('../services/salesService');
const errorMap = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const array = req.body;

  const { type, message, data } = await salesService.registerSale(array);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(data);
};

module.exports = {
  registerSale,
};