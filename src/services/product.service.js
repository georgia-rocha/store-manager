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
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = validate.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insertProduct({ name });
  const newProduct = await productModel.findProductById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};