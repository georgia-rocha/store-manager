const { idSchema, addProductSchema } = require('./schema');
// const { productModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  console.log(error);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};