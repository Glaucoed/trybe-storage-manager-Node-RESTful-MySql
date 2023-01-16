const connection = require('./db/connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [data] = await connection.execute(query);
  return data;
};

const getById = async (id) => {
  const [[data]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return data;
};

const registerProduct = async (newProductName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [newProductName],
  );
  console.log(insertId);
  return insertId;
};
registerProduct('xablau');

module.exports = {
  getAll,
  getById,
  registerProduct,
 };