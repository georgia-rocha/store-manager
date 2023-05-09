const { salesModel } = require('../models');
const validate = require('./validations/validationsInputValue');

const findSalesAll = async () => {
  const sales = await salesModel.findSalesAll();
  return { type: null, message: sales };
};

const findSalesById = async (salesId) => {
  const error = validate.validateSalesId(salesId);
  if (error.type) return error;

  const sales = await salesModel.findSalesById(salesId);
  if (sales.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sales };
};

const createSales = async (sale) => {
  const error = await validate.validateNewSale(sale);
  if (error.type) return error;

  const newSaleId = await salesModel.insertSales(sale);
  const newSales = await salesModel.findSalesById(newSaleId);
  const sales = newSales.map((saleNew) => (
    { productId: saleNew.productId, quantity: saleNew.quantity }));

  return {
    type: null,
    message: {
      id: newSaleId,
      itemsSold: sales,
  } };
};

module.exports = {
  findSalesAll,
  findSalesById,
  createSales,
};