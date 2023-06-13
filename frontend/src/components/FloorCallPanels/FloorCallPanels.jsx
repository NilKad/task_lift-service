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
  doorOpened,
  timerDoorClose,
  doorOpening,
}) => {
  // const MIN_FLOOR = 0;
  const MAX_FLOOR = 12;
  const parkingFloor = 0;

  const activeCallDirection = () => {
    const floorItem = getItemFromFloorInfo(floorInfo, currentFloor);
    if (floorItem.length === 0) return '';
    const isUp = currentFloor === floorItem.floor && 'continue_up' in floorItem && direction === 1;
    const isDown =
      currentFloor === floorItem.floor && 'continue_down' in floorItem && direction === -1;
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
              activeDirections={activeCallDirection()}
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
