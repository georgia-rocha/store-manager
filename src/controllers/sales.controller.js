const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { type, message } = await salesService.findSalesAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSalesById(id);

  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }

  return res.status(200).json(message);
};

const createSales = async (req, res) => {
  const { body } = req;

  const { type, message } = await salesService.createSales(body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id');
  const { type, message } = await salesService.deleteSales(id);
  console.log(type, message);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json({ message });
};

const updateSalesById = async (req, res) => {
  const { body, params } = req;
  const { type, message } = await salesService.updateSalesById(params.id, body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listSales,
  getSalesId,
  createSales,
  deleteSales,
  updateSalesById,
};