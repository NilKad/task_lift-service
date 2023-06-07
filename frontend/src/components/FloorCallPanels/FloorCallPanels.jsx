import { FloorStatusPanel } from './FloorStatusPanel/FloorStatusPanel';
import { FloorDirectionPaneles } from './FloorDirectionPaneles/FloorDirectionPaneles';
import * as SC from './FloorCallPanels.styled';
import { FloorDirectionPanel } from './FloorDirectionPanel/FloorDirectionPanel';
import { genArray } from '../../utils/genArray';
import { LiftSimulate } from '../LiftSimulate/LiftSimulate';

export const FloorCallPanels = ({
  direction,
  currentFloor,
  floorInfo,
  floorDirectionHandler,
}) => {
  // const MIN_FLOOR = 0;
  const MAX_FLOOR = 12;
  const parkingFloor = 0;

  return (
    <SC.FloorCallPanels>
      <FloorStatusPanel currentFloor={currentFloor} direction={direction} />
      <SC.FloorPanelWrapper>
        <SC.FloorsDirectionsPaneles>
          {genArray(true).map(e => (
            <FloorDirectionPanel
              key={e}
              floorNum={e}
              parkingFloor={parkingFloor}
              MAX_FLOOR={MAX_FLOOR}
              currentFloor={currentFloor}
              floorInfo={floorInfo}
              floorDirectionHandler={floorDirectionHandler}
            />
          ))}
        </SC.FloorsDirectionsPaneles>
        <LiftSimulate />
      </SC.FloorPanelWrapper>
    </SC.FloorCallPanels>
  );
};
