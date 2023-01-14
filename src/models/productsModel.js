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
  console.log(data);
  return data;
};

module.exports = {
  getAll,
  getById,
 };