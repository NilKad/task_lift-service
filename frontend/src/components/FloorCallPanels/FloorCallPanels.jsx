import { FloorStatusPanel } from './FloorStatusPanel/FloorStatusPanel';
import { FloorDirectionPaneles } from './FloorDirectionPaneles/FloorDirectionPaneles';
import * as SC from './FloorCallPanels.styled';
import { FloorDirectionPanel } from './FloorDirectionPanel/FloorDirectionPanel';
import { genArray } from '../../utils/genArray';
import { LiftSimulate } from '../LiftSimulate/LiftSimulate';
import { getItemFromFloorInfo } from '../../helpers/getItemFromFloorInfo';

export const FloorCallPanels = ({
  direction,
  currentFloor,
  floorInfo,
  floorDirectionHandler,
  doorOpened,
  timerDoorClose,
  doorOpening,
}) => {
  // const MIN_FLOOR = 0;
  const MAX_FLOOR = 12;
  const parkingFloor = 0;

  const activeCallDirection = floorNum => {
    const floorItem = getItemFromFloorInfo(floorInfo, floorNum);

    if (floorItem.length === 0) return { up: '', down: '' };
    const isUp =
      'continue_up' in floorItem && !(floorItem.floor === currentFloor && direction === 1)
        ? true
        : false;
    const isDown =
      'continue_down' in floorItem && !(floorItem.floor === currentFloor && direction === -1)
        ? true
        : false;
    const up = isUp ? 'active' : '';
    const down = isDown ? 'active' : '';
    return { up, down };
  };

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
              floorDirectionHandler={floorDirectionHandler}
              activeDirections={activeCallDirection(e)}
            />
          ))}
        </SC.FloorsDirectionsPaneles>
        <LiftSimulate
          doorOpened={doorOpened}
          timerDoorClose={timerDoorClose}
          doorOpening={doorOpening}
        />
      </SC.FloorPanelWrapper>
    </SC.FloorCallPanels>
  );
};
