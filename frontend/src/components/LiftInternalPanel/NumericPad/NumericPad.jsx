import { NumericButton } from './NumericButton/NumericButton';
import { genArray } from '../../../utils/genArray';

import * as SC from './NumericPad.styled';

export const NumericPad = () => {
  const parkingFloor = 0;
  const COUNT_COLUMN = 3;

  return (
    <SC.NumericPadList>
      {genArray(true, COUNT_COLUMN).map(e => (
        <>
          {e === 0 ? (
            <>
              <NumericButton
                key={'open'}
                floorNum={'<>'}
                parkingFloor={parkingFloor}
              />
              <NumericButton key={e} floorNum={e} parkingFloor={parkingFloor} />
              <NumericButton
                key={'close'}
                floorNum={'><'}
                parkingFloor={parkingFloor}
              />
            </>
          ) : (
            <NumericButton key={e} floorNum={e} parkingFloor={parkingFloor} />
          )}
        </>
      ))}
    </SC.NumericPadList>
  );
};

//   : (
//   <>
//     <NumericButton
//       key={'open'}
//       floorNum={'<>'}
//       parkingFloor={parkingFloor}
//     />
//     <NumericButton key={e} floorNum={e} parkingFloor={parkingFloor} />
//     <NumericButton
//       key={'close'}
//       floorNum={'><'}
//       parkingFloor={parkingFloor}
//     />
//   </>
// )
