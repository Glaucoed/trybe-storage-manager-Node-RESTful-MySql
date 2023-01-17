const connection = require('./db/connection');

const newIdSale = async () => {
  const query = 'INSERT INTO StoreManager.sales () VALUES ();';
  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const saleProducts = async (idSale, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ? )';
  const [result] = await connection.execute(query, [idSale, productId, quantity]);
  return result;
};

module.exports = {
  newIdSale,
  saleProducts,
};
