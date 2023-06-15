const { setCurrenFloor } = require('../services');

const liftSetStatus = async (req, res) => {
  const { floorNum } = req.params;
  const { isOpened, isMovement } = req.body;
  console.log('isOpened: ', isOpened, '\tisMovement: ', isMovement);

  if (!(floorNum !== undefined && isOpened !== undefined && isMovement !== undefined)) {
    const error = new Error('FlooNum, direction or movement incorrect');
    error.status = 401;
    throw error;
  }

  if (isOpened && isMovement) {
    const error = new Error("Сan't move with the door open");
    error.status = 401;
    throw error;
  }
  const data = await setCurrenFloor(floorNum, isOpened, isMovement);
  res.status(200).json(data);
};

module.exports = liftSetStatus;
