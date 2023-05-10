const productService = require('../services/product.service');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

const updateProductId = async (req, res) => {
  const { body, params } = req;
  const { type, message } = await productService.updateProductId(params.id, body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  return res.status(204).json({ message: 'Product deleted' });
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProductId,
  deleteProduct,
};