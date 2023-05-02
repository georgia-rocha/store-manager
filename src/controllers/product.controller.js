const { findAll, findById } = require('../services/product.service');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await findById(id);
  console.log(message);
  if (type) {
    console.log('aaaa');
    return res.status(errorMap.mapError(type)).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,  
};