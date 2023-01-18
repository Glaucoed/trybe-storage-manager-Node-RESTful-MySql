const connection = require('./db/connection');

const getAll = async () => {
  const query = `SELECT sa.id AS saleId, sa.date, sp.product_id AS productId, sp.quantity
FROM 
StoreManager.sales AS sa
INNER JOIN
StoreManager.sales_products AS sp
ON
sa.id = sp.sale_id
ORDER BY
sp.product_id, sp.product_id`;
  
  const [data] = await connection.execute(query);
  return data;
};

const queryIdAvailable = async (id) => {
    const [[data]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;', [id],
  );
  return data;
};

const getById = async (id) => {
  const query = `SELECT sa.date, sp.product_id AS productId, sp.quantity
FROM 
StoreManager.sales AS sa
INNER JOIN
StoreManager.sales_products AS sp
ON
sa.id = sp.sale_id
WHERE sa.id = ?
ORDER BY
sp.product_id, sp.product_id`;
  const [data] = await connection.execute(query, [id]);
  return data;
};

const newIdSale = async () => {
  const query = 'INSERT INTO StoreManager.sales () VALUES ();';
  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const registerSale = async (idSale, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ? )';
  const [result] = await connection.execute(query, [idSale, productId, quantity]);
  return result;
};

const removeSale = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return { type: null };
};

module.exports = {
  newIdSale,
  registerSale,
  getAll,
  getById,
  removeSale,
  queryIdAvailable,
};
