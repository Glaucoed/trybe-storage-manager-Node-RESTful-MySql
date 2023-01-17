const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  ID_SALE_NOT_FOUND: 404,
};
const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};