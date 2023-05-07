const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  NOT_FOUND: 404,
  };

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};