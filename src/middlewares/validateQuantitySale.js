module.exports = (req, res, next) => {
  const array = req.body;

  const resultArray = array.every((e) => e.quantity !== undefined && e.quantity !== null);

if (!resultArray) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};