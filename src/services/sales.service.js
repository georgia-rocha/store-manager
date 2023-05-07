const { salesModel } = require('../models');
const validate = require('./validations/validationsInputValue');

const findSalesAll = async () => {
  const sales = await salesModel.findSalesAll();
  return { type: null, message: sales };
};

const findSalesById = async (salesId) => {
  const error = validate.validateNewSales(salesId);
  if (error.type) return error;

  const sales = await salesModel.findSalesById(salesId);
  console.log(sales);
  if (sales.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sales };
};

module.exports = {
  findSalesAll,
  findSalesById,
};