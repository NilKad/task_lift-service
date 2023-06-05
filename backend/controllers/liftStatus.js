const { getStatus } = require('../models');

const liftStatus = async (req, res) => {
  const data = await getStatus();
  res.status(200).json(data);
};

module.exports = liftStatus;
