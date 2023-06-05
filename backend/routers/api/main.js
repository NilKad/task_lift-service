const express = require('express');
const {
  liftStatus,
  liftSetStatus,
  liftAddFloor,
  liftAddFloorDirection,
} = require('../../controllers');
const { ctrlWrapper, checkData } = require('../../middlewares');

const router = express.Router();

//* get current lidt status
router.get('/', ctrlWrapper(liftStatus));

//* update information about current floor and open/close door
router.post('/:floorNum', ctrlWrapper(checkData), ctrlWrapper(liftSetStatus));

//* addes floor to 'load' floor
router.put('/:floorNum', ctrlWrapper(checkData), ctrlWrapper(liftAddFloor));

//* added floor and direction of 'floor_info'
router.put(
  '/:floorNum/:direction',
  ctrlWrapper(checkData),
  ctrlWrapper(liftAddFloorDirection)
);

module.exports = mainRouter = router;
