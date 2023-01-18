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
  return insertId;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  connection.execute(query, [name, id]);
  return { id, name };
};

const removeProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return { type: null };
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProduct,
  removeProduct,
 };