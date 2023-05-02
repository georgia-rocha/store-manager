const { productModel } = require('../models');
const validate = require('./validations/validationsInputValue');

const findAll = async () => {
  const products = await productModel.findProductsAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validate.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};