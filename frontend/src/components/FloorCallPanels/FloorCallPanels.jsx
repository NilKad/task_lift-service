import { FloorStatusPanel } from './FloorStatusPanel/FloorStatusPanel';
import { FloorDirectionPaneles } from './FloorDirectionPaneles/FloorDirectionPaneles';
import * as SC from './FloorCallPanels.styled';
import { FloorDirectionPanel } from './FloorDirectionPanel/FloorDirectionPanel';
import { genArray } from '../../utils/genArray';

export const FloorCallPanels = () => {
  // const MIN_FLOOR = 0;
  const MAX_FLOOR = 12;
  const parkingFloor = 0;

  return (
    <SC.FloorCallPanels>
      <FloorStatusPanel />
      {/* <FloorDirectionPaneles /> */}
      {/* <FloorDirectionPanel /> */}
      <SC.FloorsDirectionsPaneles>
        {genArray()
          .sort((a, b) => b - a)
          .map(e => (
            <FloorDirectionPanel
              key={e}
              floorNum={e}
              parkingFloor={parkingFloor}
              MAX_FLOOR={MAX_FLOOR}
            />
          ))}
      </SC.FloorsDirectionsPaneles>
    </SC.FloorCallPanels>
  );
};
