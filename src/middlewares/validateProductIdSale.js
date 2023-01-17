module.exports = (req, res, next) => {
  const array = req.body;

  const resultArray = array.every((e) => e.productId);

if (!resultArray) return res.status(400).json({ message: '"productId" is required' });

  return next();
};