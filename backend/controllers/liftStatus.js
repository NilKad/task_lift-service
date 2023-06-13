const { checkToMovement } = require('../helpers');
const { getStatus } = require('../models');

const liftStatus = async (req, res) => {
  const data = await getStatus();
  data.direction = checkToMovement(data);
  // if(data.)
  // console.log('!!! LiftStatus data: ', data);
  res.status(200).json(data);
};

module.exports = liftStatus;
