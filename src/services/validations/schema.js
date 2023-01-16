const Joi = require('joi');

const addProductSchema = Joi.string().min(5).required();

module.exports = {
  addProductSchema,
};