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

const updateProductId = async (productId, productUpdate) => {
  const validId = validate.validateId(productId);
  console.log(validId, 'id');
  if (validId.type) return validId;

  const validName = validate.validateNewProduct(productUpdate);
  console.log(validName, 'name');
  if (validName.type) return validName;

  const productsId = await productModel.findProductById(productId);
  console.log(productsId, 'prodId');
  if (!productsId) return { type: 'NOT_FOUND', message: 'Product not found' };

  await productModel.updateProduct(productId, productUpdate);

  return { type: null, message: { id: productId, name: productUpdate.name } };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProductId,
};