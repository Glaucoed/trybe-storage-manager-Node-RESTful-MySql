const { addProductSchema } = require('./schema');

const validateName = (newProductName) => {
  const { error } = addProductSchema.validate(newProductName);

  if (error) {
    return {
      type: 'UNPROCESSABLE_ENTITY', message: '"name" length must be at least 5 characters long',
    }; 
  }
  return { type: null, message: '' };
};

module.exports = {
  validateName,
};