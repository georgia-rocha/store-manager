const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const newSaleSchema = Joi.array().items(
  Joi.object().keys({
    productId: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
).required();

module.exports = {
  idSchema,
  addProductSchema,
  newSaleSchema,
};