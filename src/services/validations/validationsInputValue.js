const { idSchema, addProductSchema, newSaleSchema } = require('./schema');
const productModel = require('../../models/product.model');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error) {
    return {
      type: error.message.includes('required') ? 'INVALID_INPUT' : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const validateSalesId = async (sales) => {
  const { error } = newSaleSchema.validate(sales);

  if (error) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: '' };
};

const validateNewSale = async (sales) => {
  const productId = sales.some((s) => s.productId === undefined);

  if (productId) return { type: 'INVALID_INPUT', message: '"productId" is required' };

  const products = await Promise.all(await sales.map(async (sale) =>
    productModel.findProductById(sale.productId)));

  if (products.some((product) => !product)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const quantity = sales.some((s) => s.quantity === undefined);
  if (quantity) return { type: 'INVALID_INPUT', message: '"quantity" is required' };

  const { error } = newSaleSchema.validate(sales);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSalesId,
  validateNewSale,
};