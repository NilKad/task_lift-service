const { addFloorDirection } = require('../services');

const liftAddFloorDirection = async (req, res) => {
  const { floorNum, direction } = req.params;
  const data = await addFloorDirection(floorNum, direction);
  res.status(200).json(data);
};

module.exports = liftAddFloorDirection;
