import { NumericButton } from './NumericButton/NumericButton';
import { genArray } from '../../../utils/genArray';

import * as SC from './NumericPad.styled';

export const NumericPad = ({ load, liftHandlerButton }) => {
  const parkingFloor = 0;
  const COUNT_COLUMN = 3;

  const renderServiceButton = e => {
    const isActive = load.includes(e);

    if (e === parkingFloor) {
      return (
        <>
          <NumericButton
            liftHandlerButton={liftHandlerButton}
            key={'open'}
            floorNum={'<>'}
            parkingFloor={parkingFloor}
          />
          <NumericButton
            liftHandlerButton={liftHandlerButton}
            key={e}
            floorNum={e}
            parkingFloor={parkingFloor}
            isActive={isActive}
          />
          <NumericButton
            liftHandlerButton={liftHandlerButton}
            key={'close'}
            floorNum={'><'}
            parkingFloor={parkingFloor}
          />
        </>
      );
    }
    return (
      <NumericButton
        liftHandlerButton={liftHandlerButton}
        key={e}
        floorNum={e}
        parkingFloor={parkingFloor}
        isActive={isActive}
      />
    );
  };
  let arr = getArray(true, COUNT_COLUMN, true);

  return (
    <SC.NumericPadList>
      {genArray(true, COUNT_COLUMN).map(e => renderServiceButton(e))}
    </SC.NumericPadList>
  );
};
